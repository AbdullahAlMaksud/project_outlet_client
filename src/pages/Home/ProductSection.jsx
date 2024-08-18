import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { IconButton, Button, Typography, Input, Collapse, Card, CardBody, Checkbox, Spinner } from '@material-tailwind/react';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import SectionHeading from '../../components/SectionHeading';

const fetchProducts = async ({ page = 1, limit = 12, search = '', sortBy = '', filters = {} }) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/products?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&category=${filters.category || ''}&brand=${filters.brand || ''}&minPrice=${filters.minPrice || 0}&maxPrice=${filters.maxPrice || 10000}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const fetchCategories = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/categories`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const fetchBrands = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/brands`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const ProductSection = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [filters, setFilters] = useState({ category: '', brand: '', minPrice: 0, maxPrice: 10000 });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [tempMinPrice, setTempMinPrice] = useState(0);
    const [tempMaxPrice, setTempMaxPrice] = useState(10000);

    const toggleOpen = () => setOpen((cur) => !cur);

    const { data: productData, error: productError, isLoading: productLoading } = useQuery({
        queryKey: ['products', active, search, sortBy, filters],
        queryFn: () => fetchProducts({ page: active, limit: 12, search, sortBy, filters }),
        keepPreviousData: true,
    });

    const { data: categoryData, isLoading: categoryLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    const { data: brandData, isLoading: brandLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands
    });

    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        setSearch(inputValue);
        setActive(1);
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearch(inputValue);
            setActive(1);
        }
    };

    const handleSortByPrice = () => {
        setSortBy(sortBy === 'priceAsc' ? 'priceDesc' : 'priceAsc');
    };

    const handleSortByDate = () => {
        setSortBy(sortBy === 'dateAsc' ? 'dateDesc' : 'dateAsc');
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(category => category !== value)
        );
    };

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        setSelectedBrands(prev =>
            checked ? [...prev, value] : prev.filter(brand => brand !== value)
        );
    };

    const handleFilterClick = () => {
        setFilters({
            ...filters,
            category: selectedCategories.join(','),
            brand: selectedBrands.join(','),
            minPrice: tempMinPrice,
            maxPrice: tempMaxPrice
        });
        setActive(1);
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setTempMinPrice(0);
        setTempMaxPrice(10000);
        setFilters({ category: '', brand: '', minPrice: 0, maxPrice: 10000 });
        setSearch('');
        setInputValue('');
        setActive(1);
    };

    const handleMinPriceInputChange = (e) => {
        const minPrice = Number(e.target.value);
        setTempMinPrice(minPrice);
    };

    const handleMaxPriceInputChange = (e) => {
        const maxPrice = Number(e.target.value);
        setTempMaxPrice(maxPrice);
    };

    const next = () => {
        if (active < productData?.totalPages) {
            setActive(prev => prev + 1);
        }
    };

    const prev = () => {
        if (active > 1) {
            setActive(prev => Math.max(prev - 1, 1));
        }
    };

    if (productLoading || categoryLoading || brandLoading) return <div className='h-40 flex items-center justify-center'><Spinner className="h-16 w-16" color='deep-orange' />;</div>;
    if (productError) return <div>Error: {productError.message}</div>;

    return (
        <>
            <SectionHeading Heading={'Products Emporium'} />
            <div id='productSection' className='mt-5 w-11/12 mx-auto' >
                
                <section className='shadow-md rounded-xl px-2 border py-4 max-w-full bg-outlet-secondary/5'>
                    <div className='flex justify-between gap-3 flex-col md:flex-row items-center'>
                        {/* Search */}
                        <div className="relative flex min-w-full md:min-w-min md:flex-1 gap-2 md:w-max">
                            <Input
                                type="search"
                                color="black"
                                label="Type here..."
                                className="pr-20"
                                containerProps={{
                                    className: "min-w-[300px]",
                                }}
                                value={inputValue}
                                onChange={handleSearchChange}
                                onKeyUp={handleKeyUp}
                            />
                            <Button
                                size="sm"
                                color="white"
                                className="!absolute right-1 top-1 rounded"
                                onClick={handleSearchClick}
                            >
                                Search
                            </Button>
                        </div>

                        {/* Sorting */}
                        <div className='flex justify-end gap-2'>
                            <Button variant='outlined' className='flex items-center font-poppins text-[.6rem] md:text-xs gap-1 text-outlet-secondary' onClick={handleSortByPrice}>
                                Price {sortBy === 'priceAsc' ? 'Low to High' : 'High to Low'} <RiArrowUpDownFill />
                            </Button>
                            <Button variant='outlined' className='flex items-center gap-1 font-poppins text-[.6rem] md:text-xs text-outlet-secondary' onClick={handleSortByDate}>
                                Date {sortBy === 'dateAsc' ? 'Old to New' : 'New to Old'} <RiArrowUpDownFill />
                            </Button>
                        </div>
                    </div>

                    {/* Filtering */}
                    <div className='mt-3 flex justify-between items-center '>
                        <Button variant='outlined' className='bg-white text-outlet-secondary' onClick={toggleOpen}>

                            {
                                open ? <span className="flex items-center gap-2">
                                    Product Filters <IoIosArrowUp className='font-bold text-md' />

                                </span> : <span className="flex items-center gap-2"> Product Filters <IoIosArrowDown className='font-bold text-md' /></span>

                            }


                        </Button>
                        <Button variant='outlined' className='bg-red-500 text-white' onClick={handleResetFilters}>Reset Filters</Button>
                    </div>
                    <Collapse open={open}>
                        <Card className="my-4 mx-auto w-11/12">
                            <CardBody>
                                <div>
                                    <h2 className='font-inter text-outlet-secondary uppercase border border-outlet-primary w-fit px-3 rounded-t-md py-2 border-b-0'>Category:</h2>
                                    <div className='grid border-outlet-primary rounded-md rounded-tl-none grid-cols-2 text-xs md:text-sm md:grid-cols-3 border'>
                                        {categoryData?.categories.map((category) => (
                                            <Checkbox
                                                key={category}
                                                label={category}
                                                value={category}
                                                onChange={handleCategoryChange}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <h2 className='font-inter text-outlet-secondary uppercase border border-outlet-primary w-fit px-3 rounded-t-md py-2 border-b-0'>Brand Name:</h2>
                                    <div className='grid border-outlet-primary rounded-md rounded-tl-none grid-cols-2 text-xs md:text-sm md:grid-cols-3 border'>
                                        {brandData?.brands.map((brand) => (
                                            <Checkbox
                                                key={brand}
                                                label={brand}
                                                value={brand}
                                                onChange={handleBrandChange}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <h2 className='font-inter text-outlet-secondary uppercase border border-outlet-primary w-fit px-3 rounded-t-md py-2 border-b-0'>Price Range:</h2>
                                    <div className='border-outlet-primary rounded-md rounded-tl-none p-4 border flex gap-3 items-center md:flex-row flex-col'>
                                        <Input
                                            type='number'
                                            placeholder='Not less than 0'
                                            label='Minimum Price'
                                            defaultValue={tempMinPrice}
                                            onChange={handleMinPriceInputChange}
                                            className='w-1/2'
                                        />
                                        <span>—</span>
                                        <Input
                                            type='number'
                                            placeholder='Not Grater Than 10000'
                                            label='Max Price'
                                            defaultValue={tempMaxPrice}
                                            onChange={handleMaxPriceInputChange}
                                            className='w-1/2'
                                        />
                                    </div>
                                </div>
                                <div className='mt-3 flex justify-end'>
                                    <Button variant='outlined' className='bg-white text-outlet-secondary' onClick={handleFilterClick}>Apply Filters</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                </section>

                {/* Product Display */}
                <section className='mt-5'>
                    <div className='grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {productData?.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Pagination */}
                <div className='mt-5 flex justify-between shadow rounded-md items-center'>
                    <IconButton variant='text' color='gray' onClick={prev} disabled={active === 1}>
                        <ArrowLeftIcon className="h-6 w-6" />
                    </IconButton>
                    <Typography variant='small' color='gray'>
                        Page {active} of {productData?.totalPages}
                    </Typography>
                    <IconButton variant='text' color='gray' onClick={next} disabled={active === productData?.totalPages}>
                        <ArrowRightIcon className="h-6 w-6" />
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default ProductSection;
