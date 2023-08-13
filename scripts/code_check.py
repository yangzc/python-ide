import pyflakes.api
import pyflakes.reporter

class LoggingReporter:
    """
    Implementation of Reporter that just appends any error to a list.
    """

    def __init__(self, log):
        """
        Construct a C{LoggingReporter}.

        @param log: A list to append log messages to.
        """
        self.log = log

    def flake(self, message):
        self.log.append(('flake', str(message)))

    def unexpectedError(self, filename, message):
        self.log.append(('unexpectedError', filename, message))

    def syntaxError(self, filename, msg, lineno, offset, line):
        self.log.append(('syntaxError', filename, msg, lineno, offset, line))


def analyze_code(code):
    result = []
    # print(dir(pyflakes.reporter))
    reporter1 = LoggingReporter(result)
    pyflakes.api.check(code, 'filename', reporter=reporter1)
    return result

# 代码示例
python_code = """
def greet(name):
    print("Hello, " + name)

for i in range(10)
    print(i)
greet("Alice")
greet("Bob"
"""

errors = analyze_code(python_code)

for error in errors:
    print(error)
    # print(f"Error at line {error.lineno}: {error.message}")
