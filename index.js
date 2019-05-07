let t=require('babel-types')


let visitor={
  ImportDeclaration(path,ref={opts:{}}){
    let node=path.node
    let specifiers=node.specifiers
    if(ref.opts.libname===node.source.value&&t.isImportSpecifier(specifiers[0])){
      let result=specifiers.map(item=>
        (t.importDeclaration([t.importDefaultSpecifier(item.local)],
          t.stringLiteral(`${node.source.value}/${item.local.name}`)))
      )
      path.replaceWithMultiple(result)
    }
  }
}





module.exports=function () {
  return {
    visitor
  }
}