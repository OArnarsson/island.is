import { useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { Query } from '@island.is/api/schema'
import { gql, useQuery, useMutation, ApolloError } from '@apollo/client'
import { RegulationDraft } from '@island.is/regulations/admin'
import {
  RegName,
  LawChapter,
  MinistryList,
  RegulationOption,
  RegulationOptionList,
} from '@island.is/regulations'
import { ShippedSummary, DraftSummary } from '@island.is/regulations/admin'
import { getEditUrl } from './routing'

// import { APPLICATION_APPLICATIONS } from '../../lib/queries/applicationApplications'

type QueryResult<T> =
  | {
      data: T
      loading?: never
      error?: never
    }
  | {
      data?: never
      loading: true
      error?: never
    }
  | {
      data?: never
      loading?: never
      error: ApolloError | Error
    }

// ---------------------------------------------------------------------------

const RegulationDraftQuery = gql`
  query draftRegulations($input: GetDraftRegulationInput!) {
    getDraftRegulation(input: $input)
  }
`

export const useRegulationDraftQuery = (
  draftId: string,
): QueryResult<RegulationDraft> => {
  const { loading, error, data } = useQuery(RegulationDraftQuery, {
    variables: {
      input: { draftId },
    },
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return { loading }
  }
  if (!data) {
    return {
      error: error || new Error(`Error fetching regulation draft "${draftId}"`),
    }
  }
  return {
    data: data.getDraftRegulation as RegulationDraft,
  }
}

// ---------------------------------------------------------------------------

const ShippedRegulationsQuery = gql`
  query ShippedRegulationsQuery {
    getShippedRegulations {
      id
      name
      title
      draftingStatus
      idealPublishDate
    }
  }
`

export const useShippedRegulationsQuery = (): QueryResult<
  Array<ShippedSummary>
> => {
  const { loading, error, data } = useQuery(ShippedRegulationsQuery, {
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return { loading }
  }
  if (!data) {
    return {
      error: error || new Error(`Error fetching shipped regulations list`),
    }
  }
  return {
    data: data.getShippedRegulations as Array<ShippedSummary>,
  }
}

// ---------------------------------------------------------------------------

const RegulationTaskListQuery = gql`
  query RegulationTaskListQuery {
    getDraftRegulations {
      id
      title
      draftingStatus
      idealPublishDate
      fastTrack
      authors
    }
  }
`

export const useRegulationTaskListQuery = (): QueryResult<
  Array<DraftSummary>
> => {
  const { loading, error, data } = useQuery(RegulationTaskListQuery, {
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return { loading }
  }
  if (!data) {
    return {
      error: error || new Error(`Error fetching shipped regulations list`),
    }
  }
  return {
    data: data.getShippedRegulations as Array<DraftSummary>,
  }
}

// ---------------------------------------------------------------------------

const MinistriesQuery = gql`
  query DraftRegulationMinistriesQuery {
    getDraftRegulationsMinistries
  }
`

export const useMinistriesQuery = (): QueryResult<MinistryList> => {
  const { loading, error, data } = useQuery<Query>(MinistriesQuery)

  if (loading) {
    return { loading }
  }
  if (!data) {
    return {
      error: error || new Error(`Error fetching ministry list`),
    }
  }
  return {
    data: data.getDraftRegulationsMinistries as MinistryList,
  }
}

// ---------------------------------------------------------------------------

const LawChaptersQuery = gql`
  query DraftRegulationsLawChaptersQuery {
    getDraftRegulationsLawChapters
  }
`

export const useLawChaptersQuery = (): QueryResult<Array<LawChapter>> => {
  const { loading, error, data } = useQuery<Query>(LawChaptersQuery)

  if (loading) {
    return { loading }
  }
  if (!data) {
    return {
      error: error || new Error(`Error fetching law chapters`),
    }
  }
  return {
    data: data.getDraftRegulationsLawChapters as Array<LawChapter>,
  }
}

// ---------------------------------------------------------------------------

const CREATE_DRAFT_REGULATION_MUTATION = gql`
  mutation CreateDraftRegulationMutation {
    createDraftRegulation
  }
`

export const useCreateRegulationDraft = () => {
  type CreateStatus =
    | { creating: boolean; error?: never }
    | { creating?: false; error: Error }

  const [status, setStatus] = useState<CreateStatus>({ creating: false })
  const [createDraftRegulation] = useMutation(CREATE_DRAFT_REGULATION_MUTATION)
  const history = useHistory()

  return {
    ...status,

    createNewDraft: () => {
      if (status.creating) {
        return
      }
      setStatus({ creating: true })
      createDraftRegulation()
        .then((res) => {
          const newDraft = res.data
            ? (res.data.createDraftRegulation as RegulationDraft)
            : undefined
          if (!newDraft) {
            throw new Error('Regulation draft not created (??)')
          }

          setStatus({ creating: false })
          history.push(getEditUrl(newDraft.id))
        })
        .catch((e) => {
          const error = e instanceof Error ? e : new Error(String(e))
          setStatus({ error })
        })
    },
  }
}

// ---------------------------------------------------------------------------

// const RegulationListQuery = gql`
//   query RegulationListQuery {
//     getRegulationList
//   }
// `

const useMockRegulationListQuery = (maybeNames: ReadonlyArray<string>) => {
  const mockData: Array<Omit<RegulationOption, 'name'>> = [
    {
      title: 'Reglugerð fyrir hafnir Hafnasjóðs Dalvíkurbyggðar.',
      migrated: true,
    },
    {
      title: 'Reglugerð um (1.) breytingu á reglugerð nr. 101/2021.',
      repealed: true,
      migrated: true,
    },
    {
      title: 'Reglugerð um eitthvað gamalt og gott.',
      migrated: false,
    },
    {
      title:
        'Reglugerð um ákvörðun framlaga úr sveitarsjóði til sjálfstætt rekinna grunnskóla.',
      migrated: true,
    },
    {
      title: 'Reglugerð um jólasveina',
      migrated: true,
    },
  ]

  const getRegulationList = useMemo(
    () =>
      // Here we mix the incoming `RegName`s into the mock data
      maybeNames
        // Skip over (ignore) one of the incoming names
        // to emulate a false-positive in the name-detection algoritm,
        // which the API just ignored.
        .filter((_, i) => i !== 1)
        .map(
          (name, i): RegulationOption => {
            return {
              name: name as RegName,
              ...(mockData[i] || mockData[0]),
            }
          },
        ),
    [maybeNames],
  )

  return {
    data: { getRegulationList },
    loading: false,
    error: undefined,
  }
}

export const useRegulationListQuery = (
  maybeNames: ReadonlyArray<string>,
): QueryResult<RegulationOptionList> => {
  // const { loading, error, data } = useQuery<Query>(RegulationListQuery, {
  //   variables: { input: { names: maybeNames } },
  //   fetchPolicy: 'no-cache',
  // })
  const { loading, error, data } = useMockRegulationListQuery(maybeNames)

  if (loading) {
    return { loading }
  }
  if (!data) {
    return {
      error: error || new Error(`Error fetching regulation`),
    }
  }
  return {
    data: data.getRegulationList as RegulationOptionList,
  }
}
