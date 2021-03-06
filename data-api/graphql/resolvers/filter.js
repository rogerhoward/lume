import Organization from '../../db/models/Organization'
import Group from '../../db/models/Group'
import {Op} from 'sequelize'

export default function({
  organization: {
    subdomain,
    id: organizationId
  },
  search,
  order,
  limit,
  offset,
  template,
  visibility,
  groups = []
}){
  let options = {
    where: {

    },
    include: []
  }
  if (organizationId) {
    options.include.push({
      model: Organization,
      as: "organization",
      where: {
        id: organizationId
      }
    })
  }

  if (subdomain) {
    options.include.push({
      model: Organization,
      as: "organization",
      where: {
        subdomain: subdomain
      }
    })
  }

  if (search) {
    Object.assign(options.where, {
      [Op.or]: [
        {
          title: {
            [Op.regexp]: search
          }
        },
        {
          description: {
            [Op.regexp]: search
          }
        },
      ]
    })
  }

  if (template) {
    Object.assign(options.where, {
      template: {
        [Op.or]: template
      }
    })
  }

  if (visibility) {
    Object.assign(options.where, {
      visibility: {
        [Op.or]: visibility
      }
    })
  }

  if (groups.length > 0) {
    options.include.push({
      model: Group,
      as: "groups",
      where: {
        id: {
          [Op.or]: groups
        }
      }
    })

  }

  if (order) {
    options.order = order.map( ({column,direction}) => ([column, direction]))
  }

  if (limit) {
    options.limit = limit
  }

  if (offset) {
    options.offset = offset
  }

  return options

}
