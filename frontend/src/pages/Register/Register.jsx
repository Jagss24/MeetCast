import React, { useState } from 'react'
import StepEmail from '../../components/Steps/StepEmail/StepEmail'
import StepOtp from '../../components/Steps/StepOtp/StepOtp'

const steps = {
    1: StepEmail,
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