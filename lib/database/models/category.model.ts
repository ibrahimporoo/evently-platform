import mongoose from 'mongoose';

interface ICategory extends mongoose.Document {
	_id: string;
	name: string;
}

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
})

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;