import {
  Box,
  Breadcrumbs,
  Divider,
  GridColumn,
  GridContainer,
  GridRow,
  Hidden,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import SubscriptionBox from '../../components/SubscriptionBox/SubscriptionBox'
import {
  CaseOverview,
  CaseTimeline,
  ReviewCard,
  WriteReviewCard,
} from '../../components'
import Layout from '../../components/Layout/Layout'
import { Advice } from '../../types/viewModels'
import { SimpleCardSkeleton } from '../../components/Card'
import StackedTitleAndDescription from '../../components/StackedTitleAndDescription/StackedTitleAndDescription'

const CaseDetails = ({ chosenCase, advices, isLoggedIn }) => {
  const dummyCase = {
    id: 3027,
    caseNumber: '3/2023',
    name:
      'Tilfærsla fasteignaskrár frá Þjóðskrá Íslands til húnæðis og mannvirkja-stofnunar',
    shortDescription:
      'Drög að frumvarpi til laga vegna tilfærslu fasteingaskrár',
    detailedDescription:
      'Frumvarp þetta mælir fyrir um breytingar á lögum vegna flutnings fasteignaskrár frá Þjóðskrá Íslands til Húsnæðis- og mannvirkjastofnunar. Tilfærslan hefur og fyrst og fremst þann tilgang að þjónusta á vegum hins opinbera á sviði húsnæðismála verður aukin og samhæfð, ásamt því sem breytingin veitir stjórnvöldum aukna yfirsýn til að gera markvissari aðgerðir til að ná jafnvægi á húsnæðismarkaði. Þjóðskrá Íslands mun áfram veita öfluga þjónustu við skráningu einstaklinga í grunnskrám landsins og veitir breytingin jafnframt tækifæri til að skilgreina framtíðarsýn Þjóðskrár með skýrum hætti og með skýrum skilum á milli stofnananna. Í frumvarpinu eru lagðar til breytingar á lögum um skráningu og mat fasteigna nr. 6/2001, lögum um Þjóðskrá Íslands nr. 70/2018 og lögum um Húsnæðis- og mannvirkjastofnun nr. 137/2019, í þeim tilgangi að færa ábyrgð á fasteignaskrá frá Þjóðskrá Íslands til Húsnæðis- og mannvirkjastofnunar. Er hér aðallega um orðalagsbreytingar að ræða auk þess sem lagt er til að í lögum um Húsnæðis- og mannvirkjastofnun verði verkefni tengd skráningu og mati fasteigna tilgreind.',
    contactName: 'Skrifstofa sveitarfélaga og byggðamála',
    contactEmail: 'irn@irn.is',
    status: 'Til umsagnar',
    institution: 'Innviðaráðuneytið',
    type: 'Drög að frumvarpi til laga',
    policyArea: 'Húsnæðis- og skipulagsmál',
    processBegins: '2023-01-13T00:00:00',
    processEnds: '2023-01-21T23:59:59',
    announcementText:
      'Innviðaráðuneytið birtir til umsagnar drög að frumvarpi til laga um breytingu á ýmsum lagaákvæðum vegna tilfærslu fasteignaskrár frá Þjóðskrá Íslands til Húsnæðis-og mannvirkjastofnunar.',
    summaryDate: null,
    summaryText: null,
    adviceCount: 2,
    created: '2023-01-13T15:46:27.82',
    changed: '2023-01-13T15:47:07.703',
    oldInstitutionName: null,
  }

  const dummyAdvices = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      number: 1,
      participantName: 'Sævar Þór Halldórsson ',
      participantEmail: 'sthh@test.is',
      content: 'Ég styð þetta.',
      created: '2023-01-10T14:01:51.040Z',
      attachments: false,
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      number: 2,
      participantName: 'Þór Jónsson ',
      participantEmail: 'sthh@test.is',
      content: 'Ég er mótfallinn þessu. ',
      created: '2023-01-09T14:01:51.040Z',
      attachments: true,
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa9',
      number: 3,
      participantName: 'Anna Mjöll Guðmundsdóttir',
      participantEmail: 'test@example.com',
      content:
        'Það er gríðarlega mikilvægt að lögð sé áhersla á frjálsan leik barna í leikskóla eins og verið er að gera með þessum breytingum og því ber að fagna. Það mætti þó bæta við, í liðnum, aðstæður barna í leikskóla að hljóðvist og rými fyrir hvert barn sé viðunandi og samkvæmt svokölluðu best practice.',
      created: '2023-01-07T14:01:51.040Z',
      attachments: true,
    },
  ]

  // Remove following lines after connecting to API
  chosenCase = dummyCase
  advices = dummyAdvices

  const card = {
    caseNumber: '76/2022',
    nameOfReviewer: 'Jon Jonsson',
    reviewPeriod: '01.08.2022 – 01.12.2022',
  }

  isLoggedIn = true // remove when functionality for logged in has been implemented

  return (
    <Layout>
      <GridContainer>
        <Box paddingY={[3, 3, 3, 5, 5]}>
          <Breadcrumbs
            items={[
              { title: 'Öll mál', href: '/' },
              { title: `Mál nr. ${chosenCase?.caseNumber}` },
            ]}
          />
        </Box>
      </GridContainer>
      <Hidden above={'md'}>
        <Box paddingBottom={3}>
          <Divider />
        </Box>
      </Hidden>
      <GridContainer>
        <GridRow rowGap={3}>
          <GridColumn
            span={['12/12', '12/12', '12/12', '3/12', '3/12']}
            order={[3, 3, 3, 1, 1]}
          >
            <Stack space={2}>
              <Divider />
              <CaseTimeline
                status="Til umsagnar"
                updatedDate="2023-01-13T15:47:07.703"
              />
              <Divider />
              <Box paddingLeft={1}>
                <Text variant="h3" color="purple400">
                  Fjöldi umsagna: 2
                </Text>
              </Box>
              <Divider />
              <Box paddingTop={1}>
                <SubscriptionBox />
              </Box>
            </Stack>
          </GridColumn>
          <GridColumn
            span={['12/12', '12/12', '12/12', '6/12', '6/12']}
            order={[1, 1, 1, 2, 2]}
          >
            <Stack space={[3, 3, 3, 9, 9]}>
              <CaseOverview chosenCase={chosenCase} />
              <Box>
                <Stack space={3}>
                  <Text variant="h1" color="blue400">
                    Innsendar umsagnir
                  </Text>
                  {advices?.map((advice: Advice) => {
                    return <ReviewCard advice={advice} key={advice.number} />
                  })}
                  <WriteReviewCard card={card} isLoggedIn={isLoggedIn} />
                </Stack>
              </Box>
            </Stack>
          </GridColumn>
          <GridColumn
            span={['12/12', '12/12', '12/12', '3/12', '3/12']}
            order={[2, 2, 2, 3, 3]}
          >
            <Stack space={3}>
              <SimpleCardSkeleton>
                <StackedTitleAndDescription
                  headingColor="blue400"
                  title="Skjöl til samráðs"
                >
                  {chosenCase.shortDescription}
                </StackedTitleAndDescription>
              </SimpleCardSkeleton>

              <SimpleCardSkeleton>
                <StackedTitleAndDescription
                  headingColor="blue400"
                  title="Aðilar sem hafa fengið boð um samráð á máli."
                >
                  Þetta mál er opið öllum til umsagnar. Skráðu þig inn hér til
                  að skrifa umsögn um málið
                </StackedTitleAndDescription>
              </SimpleCardSkeleton>

              <SimpleCardSkeleton>
                <StackedTitleAndDescription
                  headingColor="blue400"
                  title="Ábyrgðaraðili"
                >
                  {`${chosenCase.contactName} ${chosenCase.contactEmail}`}
                </StackedTitleAndDescription>
              </SimpleCardSkeleton>
            </Stack>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Layout>
  )
}

export default CaseDetails
