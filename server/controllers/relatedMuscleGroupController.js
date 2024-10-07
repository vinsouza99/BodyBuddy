import RelatedMuscleGroup from "../models/RelatedMuscleGroup.js";

export const getRelatedMuscleGroups = async (req, res) => {
  try {
    const relatedMuscleGroups = await RelatedMuscleGroup.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: relatedMuscleGroups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getRelatedMuscleGroup = async (req, res) => {
  try {
    const relatedMuscleGroup = await RelatedMuscleGroup.findByPk(req.params.id);
    if (!relatedMuscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "RelatedMuscleGroup not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: relatedMuscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createRelatedMuscleGroup = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const newRelatedMuscleGroup = await RelatedMuscleGroup.create({
      id,
      name,
      description,
    });
    res.status(201).json({
      status: "201",
      message: "RelatedMuscleGroup created successfully",
      data: newRelatedMuscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateRelatedMuscleGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const relatedMuscleGroup = await RelatedMuscleGroup.findByPk(id);
    if (!relatedMuscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "RelatedMuscleGroup not found",
      });
    }

    await relatedMuscleGroup.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "RelatedMuscleGroup updated successfully",
      data: relatedMuscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteRelatedMuscleGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const relatedMuscleGroup = await RelatedMuscleGroup.findByPk(id);
    if (!relatedMuscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "RelatedMuscleGroup not found",
      });
    }

    await relatedMuscleGroup.destroy();
    res.status(200).json({
      status: "200",
      message: "RelatedMuscleGroup deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
