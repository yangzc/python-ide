import pyflakes.api
import pyflakes.reporter

class LoggingReporter:
    def __init__(self, log):
        self.log = log

    def flake(self, message):
        self.log.append(f"flake', {str(message)}")

    def unexpectedError(self, filename, message):
        self.log.append(f"unexpectedError, {filename}, {message}")

    def syntaxError(self, filename, msg, lineno, offset, code):
        self.log.append(f"syntaxError, {filename}, {msg}, {lineno}, {offset}, {code}")

def analyze_code(code):
    result = []
    reporter1 = LoggingReporter(result)
    pyflakes.api.check(code, 'code.py', reporter=reporter1)
    return result

python_code = '''##code##
'''
errors = analyze_code(python_code)
for error in errors:
    print(error)
