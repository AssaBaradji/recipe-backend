import { Category } from "../src/models/Category.js";

describe("Category Model Tests", () => {
  let categoryId;

  it("can create a Category", async () => {
    const newCategory = {
      name: "Cuisine Senegalaise",
    };

    categoryId = await Category.createCategory(newCategory.name);
    const allCategories = await Category.getCategories();
    const createdCategory = allCategories.find(
      (category) => category.id === categoryId,
    );

    expect(categoryId).not.toBeNull();
    expect(createdCategory).not.toBeUndefined();
    expect(createdCategory.name).toBe(newCategory.name);
  });

  it("can retrieve all categories", async () => {
    const allCategories = await Category.getCategories();

    expect(allCategories).not.toBeNull();
    expect(Array.isArray(allCategories)).toBe(true);
  });

  it("can update a category", async () => {
    const updatedCategory = {
      name: "Cuisine Sénégalaise",
    };

    const result = await Category.updateCategory(
      categoryId,
      updatedCategory.name,
    );
    const allCategories = await Category.getCategories();
    const updatedCategoryObj = allCategories.find(
      (category) => category.id === categoryId,
    );

    expect(result).toBe(true);
    expect(updatedCategoryObj.name).toBe(updatedCategory.name);
  });

  it("can delete a category", async () => {
    const result = await Category.destroyCategory(categoryId);
    const allCategories = await Category.getCategories();
    const categoryAfterDeletion = allCategories.find(
      (category) => category.id === categoryId,
    );

    expect(result).toBe(true);
    expect(categoryAfterDeletion).toBeUndefined();
  });
});
