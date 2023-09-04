# Python-IDE
electron + monaco + xterm + python

# 如何判断python是否正确
使用python内置的ast模块

# 如何进行语法检查
flake8/pyflakes可以做语法检查，参考相关文档

# 如何做异常捕获
```
import sys

def custom_excepthook(exc_type, exc_value, exc_traceback):
    print("Custom excepthook called")
    # 在这里执行你自定义的异常处理逻辑
    # ...

    # 然后重新抛出原始异常
    sys.__excepthook__(exc_type, exc_value, exc_traceback)

# 设置自定义的 excepthook
sys.excepthook = custom_excepthook

# 触发异常
def raise_exception():
    raise ValueError("This is a custom exception")

try:
    raise_exception()
except:
    print("Caught the exception")
```

# 参考
monaco样式：https://github.com/microsoft/vscode/blob/6cff4df14735ecb27cf77a2cc468e2534dd55706/extensions/theme-defaults/themes/light_vs.json
python关键字: https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

