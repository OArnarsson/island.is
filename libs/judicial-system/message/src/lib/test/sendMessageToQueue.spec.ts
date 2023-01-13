import { SQSClient } from '@aws-sdk/client-sqs'
import { uuid } from 'uuidv4'
import each from 'jest-each'

import { MessageType, CaseMessage } from '../message'
import { createTestingMessageModule } from './createTestingMessageModule'

interface Then {
  result: void
  error: Error
}

type GivenWhenThen = (message: CaseMessage) => Promise<Then>

describe('MessageService - Send message to queue', () => {
  let setMocks: (mocks: unknown[]) => void
  let mockQueueUrl: string
  let mockSqs: SQSClient
  let givenWhenThen: GivenWhenThen

  beforeEach(async () => {
    const {
      setSendMocks,
      queueUrl,
      sqs,
      messageService,
    } = await createTestingMessageModule()
    setMocks = setSendMocks

    mockQueueUrl = queueUrl
    mockSqs = sqs

    givenWhenThen = async (message: CaseMessage) => {
      const then = {} as Then

      try {
        then.result = await messageService.sendMessageToQueue(message, true)
      } catch (error) {
        then.error = error as Error
      }

      return then
    }
  })

  each(Object.values(MessageType)).describe(
    'message posted to queue',
    (type) => {
      const caseId = uuid()
      const message = { type, caseId }
      const messageId = uuid()

      beforeEach(async () => {
        setMocks([{ MessageId: messageId }])

        await givenWhenThen(message)
      })

      it(`should post message ${type} to queue`, () => {
        expect(mockSqs.send).toHaveBeenCalledWith({
          QueueUrl: mockQueueUrl,
          MessageBody: JSON.stringify(message),
        })
      })
    },
  )

  describe('message not posted to queue', () => {
    const message = { caseId: uuid() } as CaseMessage
    let then: Then

    beforeEach(async () => {
      setMocks([])

      then = await givenWhenThen(message)
    })

    it('should throw error', () => {
      expect(then.error).toBeInstanceOf(Error)
      expect(then.error.message).toEqual('Some error')
    })
  })
})
