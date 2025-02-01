export const USER_ROLE = {
    user: 'user',
    admin: 'admin',
} as const;

export const userSearchableFields = [
    'email',
    'name',
    'shippingAddress',
    'presentAddress',
];

export const userStatus = ['in-progress', 'active', 'deActive'];
