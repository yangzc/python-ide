import ast
def are_code_blocks_equal_ignore_vars(code1, code2):
    try:
        tree1 = ast.parse(code1)
        tree2 = ast.parse(code2)
        ignoreVars(tree1)
        ignoreVars(tree2)
        print(ast.dump(tree1))
        print(ast.dump(tree2))

        return ast.dump(tree1) == ast.dump(tree2)
    except SyntaxError:
        return False

def ignoreVars(node):
    for child in ast.iter_child_nodes(node):
        # print(child.__class__.__name__)
        if(isinstance(child, ast.FunctionDef)):
            # print(child.name)
            child.name = "yzc"
        elif(isinstance(child, ast.Name)):
            # print(child.id)
            child.id = "yzc"
        elif(isinstance(child, ast.arg)):
            # print(child.arg)
            child.arg = "yzc"
        ignoreVars(child)

# 两段代码示例
code1 = """
def add(a, b):
    return a + b
"""

code2 = """
def multiply(x, y):
    return x + y

"""

result = are_code_blocks_equal_ignore_vars(code1, code2)
print("Code blocks are equal (ignoring variables):", result)
