import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const SatisfiedClients = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, //count only once when in view
    threshold: 0.5, //trigger when 50% of the element is in view
  });
  return (
    <div ref={ref}>
        {inView && (
            <CountUp end={500} duration={9} suffix="+" />
        )}
        <p className="text-md text-neutral-500">Satisfied clients</p>
    </div>
  )
}

export default SatisfiedClients