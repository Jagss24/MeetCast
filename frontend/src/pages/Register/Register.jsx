import React, { useState } from 'react'
import StepPhoneEmail from '../../components/Steps/StepPhoneEmail/StepPhoneEmail'
import StepOtp from '../../components/Steps/StepOtp/StepOtp'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
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