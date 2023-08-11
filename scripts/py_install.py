import sys
import os
import locale

# code path
def getCodeDir():
    dir = os.path.dirname(__file__)
    return os.path.abspath(dir)

# get build-in library
# def buildInLibDir():
#     parentDir = os.path.dirname(getCodeDir())
#     return os.path.join(parentDir, "/rumtime/py/buildInLibs")

# extend libs
buildinLibDir = sys.argv[1]
extendLibDir = sys.argv[2]
targetDir = sys.argv[3]
# print(extendLibDir)
# print(targetDir)

encode = "utf-8"

localEncoding = locale.getdefaultlocale()[1]
if(localEncoding == 'cp936'):
    encode = "gbk"

with open(targetDir, 'w', encoding=encode) as f:
    # build-in libs
    f.write(buildinLibDir + "\n")
    # extend libs
    f.write(extendLibDir + "\n")
    for libPath in sys.path:
        f.write(libPath + "\n")

print("done")