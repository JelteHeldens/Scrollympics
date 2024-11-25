import http.server
import socketserver
import sys
import json
#import keyboard
socketserver.TCPServer.allow_reuse_address = True

#if keyboard.is_pressed('Esc'):
#       sys.exit(0)
class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        if self.path == '/':
            self.path = 'index.html'
        if self.path == '/update':
            lijst = [800, 400, 500, 600]
            print('lol')
            """return self.wfile.write(lijst)"""       
        return http.server.SimpleHTTPRequestHandler.do_GET(self)
    
    def do_POST(self):
        lijst1.update(600)
        content_length = lijst1.lengte
        
# Create an object of the above class
handler_object = MyHttpRequestHandler
PORT = 8080
my_server = socketserver.TCPServer(("", PORT), handler_object)
print("Server op http://localhost:%s" % (PORT))

try:
    my_server.serve_forever()
except KeyboardInterrupt:
    pass

    my_server.server_close()
    print("Server gestopt.")
