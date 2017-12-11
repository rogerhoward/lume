import {
  Story,
  Picture,
  Comparison,
  Video,
  Detail,
  Group,
  Image,
  Obj,
  Organization,
  Movie,
  Crop,
  Story_Comparison,
  Story_Detail,
  Story_Movie,
  Story_Obj,
  Story_Picture,
  User_Organization
} from './models'



export async function createAssociations() {
  try {


    Comparison.belongsToMany(Story, {
      through: Story_Comparison,
    })

    Comparison.belongsTo(Image, {
      as: "comparisonImage0",
    })

    Comparison.belongsTo(Image, {
      as: "comparisonImage1",
    })

    Crop.belongsTo(Detail, {
      as: "detail",
    })

    Detail.hasMany(Crop, {
      as: "crops",
    })

    Detail.belongsToMany(Story, {
      through: Story_Detail,
    })

    Detail.belongsTo(Image, {
      as: "image"
    })

    Group.belongsToMany(Story, {
      as: "groups",
      through: "story_group",
    })

    Group.belongsTo(Organization, {
      as: "organization"
    })


    Image.belongsTo(Organization, {
      as: "organization"
    })

    Movie.belongsToMany(Story, {
      through: Story_Movie,
    })

    Movie.belongsTo(Video, {
      as: "video"
    })

    Obj.belongsToMany(Story, {
      through: Story_Obj,
    })

    Obj.belongsToMany(Image, {
      as: "additionalImages",
      through: "obj_additionalImage"
    })

    Obj.belongsToMany(Video, {
      as: "additionalVideos",
      through: "obj_additionalVideo"
    })

    Obj.belongsTo(Image, {
      as: "primaryImage"
    })

    Obj.belongsTo(Video, {
      as: "primaryVideo"
    })

    Organization.hasMany(Story, {
      as: "stories"
    })

    Organization.hasMany(Image, {
      as: "images"
    })

    Organization.hasMany(Video, {
      as: "videos"
    })

    Organization.hasMany(Group, {
      as: "group"
    })

    Organization.hasMany(User_Organization, {
      as: "users"
    })

    Picture.belongsToMany(Story, {
      through: Story_Picture,
    })

    Picture.belongsTo(Image, {
      as: "image"
    })

    Story.belongsToMany(Picture, {
      through: Story_Picture
    })

    Story.belongsToMany(Movie, {
      through: Story_Movie
    })

    Story.belongsToMany(Comparison, {
      through: Story_Comparison
    })

    Story.belongsToMany(Detail, {
      through: Story_Detail
    })

    Story.belongsToMany(Obj, {
      through: Story_Obj
    })

    Story.belongsToMany(Group, {
      as: "groups",
      through: "story_group",
    })

    Story.belongsToMany(Story, {
      as: "relatedStories",
      through: "story_story"
    })

    Story.belongsTo(Organization, {
      as: "organization"
    })

    Story.belongsTo(Image, {
      as: "previewImage",
    })

    Video.belongsTo(Organization, {
      as: "organization"
    })



    // Detail.belongsTo(Image, {
    //   as: "Image",
    // })
    //
    // Image.hasMany(Detail, {
    //   as: "Details"
    // })
    //
    //
    // Image.belongsTo(Organization, {
    //   as: "Organization"
    // })
    //
    // Organization.hasMany(Image, {
    //   as: "Images"
    // })
    //
    // Image.hasMany(page, {
    //   foreignKey: "mainImageId"
    // })
    //
    // page.belongsTo(Image, {
    //   as: "mainImage",
    //   foreignKey: "mainImageId"
    // })
    //
    // Image.hasMany(Obj, {
    //   foreignKey: "mainImageId",
    // })
    //
    // Obj.belongsTo(Image, {
    //   as: "mainImage",
    //   foreignKey: "mainImageId",
    // })
    //
    // Image.hasMany(thematic, {
    //   foreignKey: "previewImageId"
    // })
    //
    // thematic.belongsTo(Image, {
    //   as: "previewImage",
    //   foreignKey: "previewImageId"
    // })
    //
    // Image.hasMany(page, {
    //   foreignKey: "ComparisonImage0Id"
    // })
    //
    // page.belongsTo(Image, {
    //   as: "ComparisonImage0",
    //   foreginKey: "ComparisonImage0Id"
    // })
    //
    // Image.hasMany(page, {
    //   foreignKey: "ComparisonImage1Id"
    // })
    //
    // page.belongsTo(Image, {
    //   as: "ComparisonImage1",
    //   foreignKey: "ComparisonImage1Id"
    // })
    //
    // Obj.belongsToMany(Group, {
    //   as: 'Groups',
    //   through: 'Obj_Group',
    //   foreignKey: 'ObjId'
    // })
    // Group.belongsToMany(Obj, {
    //   as: 'Objs',
    //   through: 'Obj_Group',
    //   foreignKey: 'GroupId'
    // })
    //
    // thematic.belongsToMany(Group, {
    //   as: 'Groups',
    //   through: 'thematic_Group',
    //   foreignKey: 'thematicId'
    // })
    // Group.belongsToMany(thematic, {
    //   as: 'thematics',
    //   through: 'thematic_Group',
    //   foreignKey: 'GroupId'
    // })
    //
    // Obj.belongsToMany(thematic, {
    //   as: 'relatedThematics',
    //   through: 'Obj_thematic',
    //   foreignKey: 'ObjId'
    // })
    // thematic.belongsToMany(Obj, {
    //   as: 'relatedObjs',
    //   through: 'Obj_thematic',
    //   foreignKey: 'thematicId'
    // })
    //
    //
    // Detail.belongsToMany(Image, {
    //   as: "additionalImages",
    //   through: "Detail_Image",
    //   foreignKey: "DetailId"
    // })
    //
    // Image.belongsToMany(Detail, {
    //   as:"DetailAdditionalImages",
    //   through: "Detail_Image",
    //   foreignKey: "ImageId"
    // })
    //
    // Obj.belongsToMany(Obj, {
    //   as: "relatedObjs",
    //   through: "Obj_Obj"
    // })
    //
    // Obj.belongsToMany(Organization, {
    //   as: "Organizations",
    //   through: "Obj_Organization",
    //   foreignKey: "ObjId"
    // })
    //
    // Organization.belongsToMany(Obj, {
    //   as:"Objs",
    //   through: "Obj_Organization",
    //   foreignKey: "OrganizationId"
    // })
    //
    // Group.belongsToMany(Organization, {
    //   as: "Organizations",
    //   through: "Group_Organization",
    //   foreignKey: "GroupId"
    // })
    //
    // Organization.belongsToMany(Group, {
    //   as:"Groups",
    //   through: "Group_Organization",
    //   foreignKey: "OrganizationId"
    // })
    //
    // thematic.belongsToMany(Organization, {
    //   as: "Organizations",
    //   through: "thematic_Organization",
    //   foreignKey: "thematicId"
    // })
    //
    // Organization.belongsToMany(thematic, {
    //   as:"thematics",
    //   through: "thematic_Organization",
    //   foreignKey: "OrganizationId"
    // })
    //



  } catch (ex) {

    console.log("createAssociations ex", ex)
    process.exit(1)
  }
}
