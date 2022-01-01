import {Authentication, AuthenticationMethod, useAuthentication} from "../../context/AuthenticationProvider";
import {useState} from "react";
import useGetTwilioAccount, {AccountInfo} from "../../hook/useGetTwilioAccount";
import {AuthenticateForm} from "./AuthenticationPageView";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import AccountDetails from "../AccountDetailsCard/AccountDetailsCardView";

const AuthenticationPage = () => {
  const [authentication, setAuthentication] = useAuthentication()
  const [accountInfo, setAccountInfo] = useState(authentication.accountInfo)
  const [accountSid, setAccountSid] = useState(authentication.accountSid)
  const [authToken, setAuthToken] = useState(authentication.authToken)
  const [apiKey, setApiKey] = useState(authentication.apiKey)
  const [apiSecret, setApiSecret] = useState(authentication.apiSecret)
  const [authMethod, setAuthMethod] = useState(AuthenticationMethod.NONE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGetAccountsSuccess = (response) => {
    const info = new AccountInfo(
      response.data.friendly_name,
      response.data.type,
      response.data.status,
      response.data.date_created,
      response.data.date_updated,
    )
    setAccountInfo(info)
  }

  const handleGetAccountsComplete = () => {
    setLoading(false)
  }

  const handleError = (err) => {
    setError(err)
    setLoading(false)
  }

  const handleSignIn = (type = AuthenticationMethod.NONE) => {
    const auth = new Authentication(accountSid, authToken, apiKey, apiSecret, type)
    setLoading(true)
    setAuthentication(auth)
    getTwilioAccount(auth)
  }

  const getTwilioAccount = useGetTwilioAccount({
    onError: handleError,
    onSuccess: handleGetAccountsSuccess,
    onComplete: handleGetAccountsComplete
  })

  return <DefaultLayout>
    <h4>Authentication</h4>
    <ErrorLabel error={error}/>
    <AuthenticateForm
      accountSid={accountSid}
      authToken={authToken}
      apiKey={apiKey}
      apiSecret={apiSecret}
      authMethod={authMethod}
      loading={loading}
      onAccountSidChange={setAccountSid}
      onAuthTokenChange={setAuthToken}
      onApiKeyChange={setApiKey}
      onApiSecretChange={setApiSecret}
      onAuthTypeChange={setAuthMethod}
      onSignIn={handleSignIn}/>
    <AccountDetails accountInfo={accountInfo}/>
  </DefaultLayout>
}

export default AuthenticationPage
