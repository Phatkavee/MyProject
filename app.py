<<<<<<< HEAD
from flask import Flask, render_template, request, redirect, url_for
from pysnmp.hlapi.asyncio import getCmd, SnmpEngine, CommunityData, UdpTransportTarget, ContextData, ObjectType, ObjectIdentity
import asyncio
=======
from flask import Flask, render_template, request, redirect, url_for, session
from pysnmp.hlapi import *
>>>>>>> fedfc7eaadfc1e9f3832c8b1336c310c1f4698b6

app = Flask(__name__)
app.secret_key = 'your_secret_key'

<<<<<<< HEAD
# กำหนดค่า OID สำหรับ ifAdminStatus และ ifOperStatus
IF_ADMIN_STATUS_OID = '1.3.6.1.2.1.2.2.1.7'  # OID สำหรับ ifAdminStatus
IF_OPER_STATUS_OID = '1.3.6.1.2.1.2.2.1.8'   # OID สำหรับ ifOperStatus

# กำหนดพอร์ตของสวิตช์
switch_ports = {
    1: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.1'},
    2: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.2'},
    3: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.3'},
    4: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.4'},
    5: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.5'},
    6: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.6'},
    7: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.7'},
    8: {'status': 'down', 'oid': f'{IF_ADMIN_STATUS_OID}.8'},
}

target_ip = '192.168.1.124'  # แก้ไขเป็น IP ของอุปกรณ์สวิตช์/เราเตอร์ของคุณ
community_string = 'public'  # แก้ไขเป็น community string ของ SNMP

async def set_port_status(port, action):
    """ส่ง SNMP คำสั่งเพื่อปรับสถานะของพอร์ต"""
    snmp_engine = SnmpEngine()
    community_data = CommunityData(community_string)
    target = UdpTransportTarget((target_ip, 161))

    if action == 'up':
        value = 1  # 1 = up
    elif action == 'down':
        value = 2  # 2 = down

    # สร้าง ObjectType สำหรับ SNMP SET คำสั่ง
    oid = ObjectIdentity(switch_ports[port]['oid'])
    object_type = ObjectType(oid, value)

    # ส่งคำสั่ง SET
    await getCmd(snmp_engine, community_data, target, ContextData(), object_type)

@app.route('/')
def index():
    return render_template('index.html', ports=switch_ports)

@app.route('/set_port/<int:port_id>', methods=['POST'])
async def set_port(port_id):
    action = request.form['action']  # 'up' หรือ 'down'
    await set_port_status(port_id, action)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
=======
# Route to display the IP input form
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle the IP submission and go to Control Port page
@app.route('/set_ip_address', methods=['POST'])
def set_ip_address():
    ip_address = request.form['ip_address']
    session['ip_address'] = ip_address
    # Here you could retrieve interface data based on IP and pass it to the next page
    return redirect(url_for('control_port'))

# Route to display the Control Port page
@app.route('/control_port')
def control_port():
    ip_address = session.get('ip_address', None)
    interface_data = retrieve_interface_data(ip_address)  # Custom function to get interface data
    return render_template('index.html', interface_data=interface_data)

# Route to toggle port status (Place this after the control_port route)
@app.route('/control_port', methods=['POST'])
def control_port_action():
    interface_name = request.form['interface_name']
    action = request.form['action']
    # Add SNMP command logic here to toggle port state based on `interface_name` and `action`
    return redirect(url_for('control_port'))

def retrieve_interface_data(ip_address):
    # Your function to get interface data based on SNMP and IP address
    return [('1', 'up'), ('2', 'down')]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
>>>>>>> fedfc7eaadfc1e9f3832c8b1336c310c1f4698b6
