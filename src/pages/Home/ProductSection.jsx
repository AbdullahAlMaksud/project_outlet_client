import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { IconButton, Button, Typography, Input, Collapse, Card, CardBody, Checkbox } from '@material-tailwind/react';
import { RiArrowUpDownFill } from 'react-icons/ri';
// import { Input } from 'postcss';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const fetchProducts = async (page = 1, limit = 12) => {
    const res = await fetch(`http://localhost:3000/products?page=${page}&limit=${limit}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const ProductSection = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(1);
    const toggleOpen = () => setOpen((cur) => !cur);



    const { data, error, isLoading } = useQuery({
        queryKey: ['products', active],
        queryFn: () => fetchProducts(active, 12),
        keepPreviousData: true,
    });

    // useEffect(() => {
    //     console.log(`Fetching products for page ${active}`);
    //     console.log(data?.products); // Check if data changes on page change
    // }, [active, data]);


    const next = () => {
        if (active < data?.totalPages) {
            setActive((prev) => prev + 1);
        }
    };

    const prev = () => {
        if (active > 1) {
            setActive((prev) => Math.max(prev - 1, 1));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='text-3xl font-bold text-center my-5'>Our Products</h2>

            {/* Search */}
            <div className="relative flex min-w-full gap-2 md:w-max">
                <Input
                    type="search"
                    color="black"
                    label="Type here..."
                    className="pr-20"
                    containerProps={{
                        className: "min-w-[300px]",
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
                {data?.products.map((product) => (
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
                    <strong className="text-gray-900">{data.totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === data?.totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
};

export default ProductSection;
