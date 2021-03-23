import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  View,
  Text,
} from 'react-native'
import {
  Badge,
  Button,
  Container,
  Heading,
  StatusCard,
} from '@island.is/island-ui-native'
import logo from '../../assets/logo-island.png'
import { useAuthStore } from '../../auth/auth'
import { useNavigation } from 'react-native-navigation-hooks'
import { NavigationFunctionComponent, Options } from 'react-native-navigation'
import { theme } from '@island.is/island-ui/theme'
import { gql, useQuery } from '@apollo/client'
import { client } from '../../graphql/client'

export const Home: NavigationFunctionComponent = () => {
  const { push } = useNavigation()
  const authStore = useAuthStore()
  const res = useQuery(
    gql`
      {
        nationalRegistryUser {
          nationalId
          fullName
          gender
          legalResidence
          birthday
          birthPlace
          religion
          maritalStatus
          age
          address {
            code
          }
        }
      }
    `,
    {
      client,
    },
  )

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: theme.color.blue100,
        }}
      >
        <View
          style={{
            height: '100%',
            marginTop: 10,
            backgroundColor: `${theme.color.blue100}`,
          }}
        >
          <Container>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
              }}
            >
              <Image
                source={logo}
                resizeMode="contain"
                style={{ width: 45, height: 45, marginBottom: 20 }}
              />
            </View>
            <Heading isCenterAligned>Staða umsókna</Heading>
            <StatusCard
              title="Fæðingarorlof 4/6"
              description="Skipting orlofstíma"
              badge={<Badge title="Vantar gögn" />}
              progress={66}
            />
            <StatusCard
              title="Fæðingarorlof 1/3"
              description="Skipting orlofstíma"
              badge={<Badge title="Vantar gögn" />}
              progress={33}
            />
            <StatusCard
              title="Fæðingarorlof 9/10"
              description="Skipting orlofstíma"
              badge={<Badge title="Vantar gögn" />}
              progress={90}
            />
            <StatusCard
              title="Fæðingarorlof 4/6"
              description="Skipting orlofstíma"
              badge={<Badge title="Vantar gögn" />}
              progress={66}
            />
            <StatusCard
              title="Fæðingarorlof 1/3"
              description="Skipting orlofstíma"
              badge={<Badge title="Vantar gögn" />}
              progress={33}
            />
            <StatusCard
              title="Fæðingarorlof 9/10"
              description="Skipting orlofstíma"
              badge={<Badge title="Vantar gögn" />}
              progress={90}
            />
          </Container>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: -10,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: 'white',
          shadowColor: 'rgba(0, 97, 255, 1)',
          shadowOffset: {
            width: 0,
            height: -10,
          },
          shadowOpacity: 0.16,
          shadowRadius: 8.0,
        }}
      />
    </>
  )
}

Home.options = {
  topBar: {
    title: {
      component: {
        name: 'is.island.TitleComponent',
        alignment: 'fill',
        passProps: {
          title: 'Yfirlit',
        },
      },
    },
  },
  layout: {
    backgroundColor: theme.color.blue100,
  },
}
