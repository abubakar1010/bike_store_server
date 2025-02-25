export const USER_ROLE = {
    customer: 'customer',
    admin: 'admin',
} as const;

export const userSearchableFields = [
    'email',
    'name',
    'shippingAddress',
    'presentAddress',
];

export const userStatus = ['active', 'inactive'];
