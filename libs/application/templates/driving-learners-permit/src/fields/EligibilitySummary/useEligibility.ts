import { getValueViaPath } from '@island.is/application/core'
import { Application } from '@island.is/application/types'
import { ApplicationEligibility } from '../../types/schema'
import { useQuery, gql } from '@apollo/client'
import { LearnersPermitFakeData, YES } from '../../lib/constants'
import { fakeEligibility } from './fakeEligibility'

const QUERY = gql`
  query EligibilityQuery {
    learnerMentorEligibility {
      isEligible
      requirements {
        key
        requirementMet
      }
    }
  }
`
export interface UseEligibilityResult {
  error?: Error
  eligibility?: ApplicationEligibility
  loading: boolean
}

export const useEligibility = (
  answers: Application['answers'],
): UseEligibilityResult => {
  const fakeData = getValueViaPath<LearnersPermitFakeData>(answers, 'fakeData')
  const usingFakeData = fakeData?.useFakeData === YES

  const { data = {}, error, loading } = useQuery(QUERY, {
    skip: usingFakeData,
  })

  if (usingFakeData) {
    return {
      loading: false,
      eligibility: fakeEligibility({
        categoryIssued: fakeData?.mentorLicenseIssuedDate ?? '2020-01-01',
        categoryType: fakeData?.currentLicense === 'B-full' ? 'B' : 'none',
        deprivationDateTo:
          fakeData?.deprivationDateTo ?? new Date(Date.now()).toDateString(),
        mentorAge: fakeData?.mentorAge ?? '20',
      }),
    }
  }

  if (error) {
    console.error(error)
    // TODO: m.
    return {
      loading: false,
      error: error,
    }
  }

  return {
    loading,
    eligibility: data.learnerMentorEligibility,
  }
}