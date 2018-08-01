const babelPluginUtils = require('@babel/helper-plugin-utils');
const babelModuleImports = require('@babel/helper-module-imports');

module.exports = babelPluginUtils.declare(({ types: t, assertVersion }, options) => {
    assertVersion(7);
    return {
        visitor: {
            CallExpression(path) {
                if (path.get('callee').isIdentifier({ name: 'importStoreModules' })) {
                    let modulesFrom = path.get('arguments.1').node.value,
                        importDeclarations = path
                            .get('arguments.0')
                            .node
                            .elements
                            .map(node => {
                                let importDefaultSpecifier = t.importDefaultSpecifier(t.identifier(node.value)),
                                    source = t.stringLiteral(`${modulesFrom}/${node.value}`.replace(/\/\//g, '/')),
                                    importDeclaration = t.importDeclaration([importDefaultSpecifier], source);
                                return importDeclaration;
                            });
                    path.replaceWithMultiple(importDeclarations)
                }
            }
        }
    };
})