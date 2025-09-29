export const getEnv = (name) => {
    const value = process.env[name];
    if (!value) throw new Error(`Environment variable "${name}" is missing`);
    return value;
};
