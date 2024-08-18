import React from 'react';

const SectionHeading = ({Heading}) => {
    return (
        <div className="relative bg-cover bg-bottom lg:h-40 h-24 flex items-center justify-center rounded-bl-full overflow-clip">
        <div className="absolute inset-0 bg-[url('./section-bg.svg')] bg-cover bg-bottom opacity-30">
        </div>
        <h2 className='relative font-poppins text-3xl lg:text-4xl -rotate-2 drop-shadow-xl text-outlet-secondary font-bold'>
          {Heading}
        </h2>  
      </div>
      
    );
};

export default SectionHeading;