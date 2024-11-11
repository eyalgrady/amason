import { useState } from "react";

export default function useMultistepForm(steps, clearSecondStepData) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((i) => {
      if (i > steps.length - 1) return i;
      return i + 1;
    });
  };

  const prevStep = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  // const prevStep = () => {
  //   setCurrentStepIndex((i) => {
  //     if (i <= 0) return i;

  //     // כאשר חוזרים לשלב הראשון, מסירים נתונים לא רלוונטיים של השלב השני
  //     if (i === 1) {
  //       clearSecondStepData(); // קריאה לפונקציה שמנקה את הנתונים של השלב השני
  //     }

  //     return i - 1;
  //   });
  // };

  // const nextStep = () => {
  //   console.log("Current Step Index before nextStep:", currentStepIndex);
  //   setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  //   console.log("Current Step Index after nextStep:", currentStepIndex);
  // };

  // const prevStep = () => {
  //   console.log("Current Step Index before prevStep:", currentStepIndex);
  //   setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  //   console.log("Current Step Index after prevStep:", currentStepIndex);
  // };

  const goTo = (index) => {
    setCurrentStepIndex(index);
  };
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isSecondStep: currentStepIndex === 1,
    isLastPage: currentStepIndex === steps.length - 1,
    nextStep,
    prevStep,
    goTo,
  };
}
