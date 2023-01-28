import { ReactNode } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Step, Steps as ChakraSteps, useSteps } from 'chakra-ui-steps';

interface StepItem {
  component: ReactNode;
  label: string;
  requiredValue?: string;
}

interface StepsProps {
  disabled: boolean;
  steps: StepItem[];
  onFinish: () => void;
}

export default function Steps({ disabled, steps, onFinish }: StepsProps) {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const currentStep = steps[activeStep];
  const isLast = activeStep === steps.length - 1;

  return (
    <Flex flexDir="column" width="100%">
      <ChakraSteps activeStep={activeStep}>
        {steps.map(({ component, label }, index) => (
          <Step label={label} key={index}>
            <Box padding="25px" margin="20px 0">
              {component}
            </Box>
          </Step>
        ))}
      </ChakraSteps>

      <Flex width="100%" justify="flex-end">
        <Button
          isDisabled={activeStep === 0}
          mr={4}
          onClick={prevStep}
          size="sm"
          variant="ghost"
        >
          Prev
        </Button>
        <Button
          size="sm"
          onClick={isLast ? onFinish : nextStep}
          isDisabled={disabled || currentStep?.requiredValue === ''}
        >
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </Flex>
    </Flex>
  );
}
