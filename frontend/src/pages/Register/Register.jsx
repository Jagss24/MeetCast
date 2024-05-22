import React, { useState } from 'react'
import StepAvatar from '../../components/Steps/StepAvatar/StepAvatar'
import StepName from '../../components/Steps/StepName/StepName'
import StepUserName from '../../components/Steps/StepUserName/StepUserName'
import StepPhoneEmail from '../../components/Steps/StepPhoneEmail/StepPhoneEmail'
import StepOtp from '../../components/Steps/StepOtp/StepOtp'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUserName
}
const Register = () => {
    const [step, setStep] = useState(1)
    const Step = steps[step]
    return (
        <>
            <Step setStep={setStep} />
        </>
    )
}

export default Register;