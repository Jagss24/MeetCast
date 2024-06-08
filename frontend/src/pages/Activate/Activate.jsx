import React, { useState } from 'react';
import StepName from "../../components/Steps/StepName/StepName"
import StepAvatar from '../../components/Steps/StepAvatar/StepAvatar';

const steps = {
    1: StepName,
    2: StepAvatar
}

const Activate = () => {
    const [step, setStep] = useState(1)

    const Step = steps[step]

    return (
        <>
            <Step setStep={setStep}></Step>
        </>
    )
}

export default Activate