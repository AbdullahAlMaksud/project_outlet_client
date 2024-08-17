import React from "react";
import { Typography } from "@material-tailwind/react";

function NavItem({ icon: Icon, label }) {
    return (
        <li>
            <Typography
                as="a"
                href="#"
                variant="paragraph"
                color="blue-gray"
                className="text-blue-gray-700 flex items-center gap-2 font-medium"
            >
                <Icon className="h-5 w-5" />
                {label}
            </Typography>
        </li>
    );
}

export default NavItem;
