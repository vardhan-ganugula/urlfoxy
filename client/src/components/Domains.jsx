import AddDomains from "./AddDomains";
import React, { useState } from 'react';
import DomainTable from "./DomainTable";
import DNSSettings from "./DNSSettings";
import VerifyDomain from "./VerifyDomain";

const Domains = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [currentDomain, setCurrentDomain] = useState('');
  console.log(currentDomain)
  const stages = [<AddDomains setCurrentDomain={setCurrentDomain} onNext={() => setCurrentStep(1) } />, <DNSSettings onNext={() => setCurrentStep(2)}/>, <VerifyDomain domain={currentDomain} />]
  return (
    <>
      {
        stages[currentStep]
      }
      
      <DomainTable />
    </>
  );
};

export default React.memo(Domains);
