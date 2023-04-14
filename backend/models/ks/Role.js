/**
 * Role model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Role = new keystone.List('Role', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Role.add({
    name: {type: Types.Text, initial: true},
    parent: {type: Types.Relationship, ref: 'Role', initial: true, required: false, index: false},
    inherit: {type: Types.Relationship, ref: 'Role', initial: true, required: false, index: false, many: true},
    permissions: {
        type: Types.List, fields: {
            resource: {type: Types.Relationship, ref: 'Resource', initial: true, required: false, index: false},
            accessLevel: {
                type: Types.Select,
                options: 'NONE, READ_ALL, CREATE, READ, READ_HIERARCHY, MODIFY, DESTROY, DESTROY_ALL',
                initial: true
            }
        }
    },
    restrictions: {
        type: Types.List, fields: {
            resource: {type: Types.Relationship, ref: 'Resource', initial: true, required: false, index: false}
        }
    },
    userPermissions: {type: Types.TextArray, initial: true, required: false, index: false} /*[String]*/
});

/**
 * Registration
 */
Role.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Role.register();

