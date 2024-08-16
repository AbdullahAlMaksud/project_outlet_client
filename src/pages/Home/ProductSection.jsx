import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { IconButton, Button, Typography, Input, Collapse, Card, CardBody, Checkbox } from '@material-tailwind/react';
import { RiArrowUpDownFill } from 'react-icons/ri';
// import { Input } from 'postcss';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const fetchProducts = async () => {
    const res = await fetch('http://localhost:3000/products');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const ProductSection = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });

    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);


    const [active, setActive] = useState(1);

    const next = () => {
        if (active === 10) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='text-3xl font-bold text-center my-5'>Our Products</h2>

            {/* Search */}
            <div className="relative flex w-full gap-2 md:w-max">
                <Input
                    type="search"
                    color="white"
                    label="Type here..."
                    className="pr-20"
                    containerProps={{
                        className: "min-w-[288px]",
                    }}
                />
                <Button
                    size="sm"
                    color="white"
                    className="!absolute right-1 top-1 rounded"
                >
                    Search
                </Button>
            </div>

            {/* Filtering */}
            <div className='mt-3'>
                <Button className='bg-outlet-secondary' onClick={toggleOpen}>Select Category</Button>
            </div>
            <Collapse open={open}>
                <Card className="my-4 mx-auto w-11/12">
                    <CardBody>
                        <div>
                            <h2>Category:</h2>
                            <Checkbox label="Category 1" />
                            <Checkbox label="Category 2" />
                            <Checkbox label="Category 3" />
                            <Checkbox label="Category 4" />
                            <Checkbox label="Category 5" />
                            <Checkbox label="Category 6" />
                        </div>
                        <div>
                            <h2>Brand Name:</h2>
                            <Checkbox label="Category 1" />
                            <Checkbox label="Category 2" />
                            <Checkbox label="Category 3" />
                            <Checkbox label="Category 4" />
                            <Checkbox label="Category 5" />
                            <Checkbox label="Category 6" />
                        </div>
                        <div>
                            <h2>Price Range:</h2>
                            <RangeSlider />
                        </div>
                    </CardBody>
                </Card>
            </Collapse>

            {/* Shorting */}
            <div className='flex justify-between my-3'>
                <Button className='flex items-center gap-1 font-normal bg-outlet-secondary'>Price high to Low <RiArrowUpDownFill /></Button>
                <Button className='flex items-center gap-1 font-normal bg-outlet-secondary'>Date new to old <RiArrowUpDownFill /></Button>
            </div>




            {/* Product Display */}
            <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
                {data.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>


            {/* Paggination */}
            <div className="flex items-center justify-center my-5 gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{active}</strong> of{" "}
                    <strong className="text-gray-900">10</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === 10}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
};

export default ProductSection;
