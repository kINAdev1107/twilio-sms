import {useAuthentication} from "../../context/AuthenticationProvider";
import {useState} from "react";
import useGetTwilioAccount from "../../hook/useGetTwilioAccount";
import {AccountDetails, AuthenticateForm} from "./AuthenticationPageView";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

const AuthenticationPage = () => {
  const [authentication, setAuthentication] = useAuthentication()
  const [accountInfo, setAccountInfo] = useState(authentication.accountInfo)
  const [accountSid, setAccountSid] = useState(authentication.accountSid)
  const [authToken, setAuthToken] = useState(authentication.authToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGetAccountsSuccess = (response) => {
    const info = {
      name: response.data.friendly_name,
      type: response.data.type,
      status: response.data.status,
      dateCreated: response.data.date_created,
      dateUpdated: response.data.date_updated,
    }
    setAccountInfo(info)
    setAuthentication({accountSid, authToken, accountInfo: info})
  }

  const handleGetAccountsComplete = () => {
    setLoading(false)
  }

  const handleError = (err) => {
    setError(err)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    getTwilioAccount({accountSid, authToken})
  }

  const getTwilioAccount = useGetTwilioAccount({
    onSuccess: handleGetAccountsSuccess,
    onError: handleError,
    onComplete: handleGetAccountsComplete
  })

  return <DefaultLayout>
    <h4>Authentication</h4>
    <ErrorLabel error={error}/>
    <AuthenticateForm
      accountSid={accountSid}
      authToken={authToken}
      loading={loading}
      onAccountSidChange={v => setAccountSid(v)}
      onAuthTokenChange={v => setAuthToken(v)}
      onSubmit={handleSubmit} />
    <AccountDetails accountInfo={accountInfo}/>
  </DefaultLayout>
}

export default AuthenticationPage