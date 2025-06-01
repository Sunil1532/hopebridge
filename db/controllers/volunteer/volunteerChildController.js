import Child from "../../models/Child.js";

export const addChild = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);
    
        const childData = { ...req.body };
    
        if (req.file) {
          childData.photo = req.file.filename;
        }
    
        const newChild = new Child(childData);
        await newChild.save();
        res.status(201).json({ message: "Child added successfully", child: newChild });
      } catch (err) {
        console.error("Error adding child:", err);
        res.status(500).json({ error: "Failed to add child", details: err.message });
      }
};

export const getChildren = async (req, res) => {
  try {
    const children = await Child.find().sort({ submittedAt: -1 });
    res.json(children);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch children" });
  }
};

export const updateChild = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };
  
      // If a new photo is uploaded, add its filename to updateData
      if (req.file) {
        updateData.photo = req.file.filename;
      }
  
      const updated = await Child.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updated) {
        return res.status(404).json({ error: "Child not found" });
      }
  
      res.json({ message: "Child updated successfully", child: updated });
    } catch (err) {
      console.error("Error updating child:", err);
      res.status(500).json({ error: "Failed to update child", details: err.message });
    }
  };
  
