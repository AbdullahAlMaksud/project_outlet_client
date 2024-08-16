import { Button } from '@material-tailwind/react';
import React from 'react';

const App = () => {
  return (
    <div className='flex items-center flex-col gap-1 justify-center my-5'>
      <Button className='bg-outlet-secondary'>Outlet</Button>
      <Button className='bg-outlet-primary'>Primary</Button>
      <Button className='bg-outlet-accent'>Accent</Button>
      <Button className='bg-outlet-hover'>Hover</Button>
      <Button className='bg-outlet-text'>Text</Button>
      <Button className='bg-outlet-default text-outlet-text'>Default</Button>
      <Button className='bg-outlet-bg text-outlet-text'>Bg</Button>
    </div>
  );
};

export default App;