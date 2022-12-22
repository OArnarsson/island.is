import {
  Button,
  CancelButton,
  NavigationBarSheet,
  TextField,
  Typography,
} from '@island.is/island-ui-native'
import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation'
import { useThemedNavigationOptions } from '../../hooks/use-themed-navigation-options'
import { useIntl } from 'react-intl'
import { testIDs } from '../../utils/test-ids'
import { useUpdateUserProfile } from './profile-queries'

const {
  getNavigationOptions,
  useNavigationOptions,
} = useThemedNavigationOptions(() => ({
  topBar: {
    visible: false,
  },
}))

export const EditConfirmScreen: NavigationFunctionComponent<any> = ({
  componentId,
  parentComponentId,
  type,
  email,
  phone,
}) => {
  useNavigationOptions(componentId)
  const intl = useIntl()
  const [text, onChangeText] = React.useState('')
  const { updateUserProfile } = useUpdateUserProfile()
  const disabled = text.trim().length < 6;

  const handleConfirm = async () => {
    let input: any = {}
    if (type === 'email') {
      input = { email: email, emailCode: text }
    } else if (type === 'phone') {
      input = { mobilePhoneNumber: phone, smsCode: text }
    }
    try {
      const res = await updateUserProfile(input)
      console.log(res);
      if (res.data?.updateProfile) {
        Navigation.dismissModal(componentId)
        if (parentComponentId) {
          Navigation.dismissModal(parentComponentId)
        }
      } else {
        throw new Error('Failed')
      }
    } catch (e) {
      Alert.alert('Villa', 'Gat ekki uppfært upplýsingar');
    }
  }

  return (
    <View style={{ flex: 1 }} testID={testIDs.SCREEN_EDIT_CONFIRM}>
      <NavigationBarSheet
        componentId={componentId}
        title={intl.formatMessage({ id: 'edit.confirm.screenTitle' })}
        onClosePress={() => Navigation.dismissModal(componentId)}
        style={{ marginHorizontal: 16 }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ marginBottom: 32, marginTop: 8 }}>
            <Typography>
              {intl.formatMessage({ id: 'edit.confirm.description' })}
            </Typography>
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextField
              label={intl.formatMessage({ id: 'edit.confirm.inputlabel' })}
              value={text}
              onChange={onChangeText}
              placeholder="000000"
              maxLength={6}
              autoFocus
              keyboardType="number-pad"
              textContentType="oneTimeCode"
            />
          </View>
          <Button
            title={intl.formatMessage({ id: 'edit.confirm.button' })}
            onPress={() => {
              handleConfirm()
            }}
            style={{
              marginBottom: 24,
            }}
            disabled={disabled}
          />
          <View style={{ alignItems: 'center' }}>
            <CancelButton
              title={intl.formatMessage({ id: 'edit.cancel.button' })}
              onPress={() => Navigation.dismissModal(componentId)}
              isSmall
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

EditConfirmScreen.options = getNavigationOptions
