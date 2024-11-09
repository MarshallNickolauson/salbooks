import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const validateUser = (user) => {
    const schema = Joi.object({
        _id: Joi.allow(),
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        isAdmin: Joi.boolean(),
        __v: Joi.number().optional(),
        createdAt: Joi.allow(),
        updatedAt: Joi.allow(),
    });
    return schema.validate(user);
};

userSchema.pre('validate', function (next) {
    const { error } = validateUser(this.toObject());
    if (error) {
        throw new Error(error.details[0].message);
    } else {
        next();
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
});

const User = mongoose.model('User', userSchema);

export default User;
