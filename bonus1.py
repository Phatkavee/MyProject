from pysnmp import hlapi
import time

def get_snmp_data(ip, community, oid):
    error_indication, error_status, error_index, var_binds = next(
        hlapi.getCmd(
            hlapi.SnmpEngine(),
            hlapi.CommunityData(community),
            hlapi.UdpTransportTarget((ip, 161)),
            hlapi.ContextData(),
            hlapi.ObjectType(hlapi.ObjectIdentity(oid))
        )
    )
    if error_indication:
        print(f"Error: {error_indication}")
    elif error_status:
        print(f"Error: {error_status.prettyPrint()}")
    else:
        for var_bind in var_binds:
            return int(var_bind[1])
    return None

def monitor_traffic(ip, community, interval_seconds):
    ifInOctets_oid = '1.3.6.1.2.1.2.2.1.10'
    ifOutOctets_oid = '1.3.6.1.2.1.2.2.1.16'

    while True:
        in_traffic = get_snmp_data(ip, community, ifInOctets_oid)
        out_traffic = get_snmp_data(ip, community, ifOutOctets_oid)

        if in_traffic is not None and out_traffic is not None:
            print(f"In Traffic: {in_traffic} octets")
            print(f"Out Traffic: {out_traffic} octets")
        else:
            print("Failed to retrieve SNMP data.")

        time.sleep(interval_seconds)

target_ip = '192.168.1.124'  # แก้ไขให้ตรงกับ IP ของอุปกรณ์ SNMP // เลือกไอพี
community_string = 'public'

# กำหนดช่วงเวลา
intervals = {
    "1 minute": 60,
    "15 minutes": 15 * 60,
    "30 minutes": 30 * 60,
    "1 hour": 1 * 60 * 60,
    "1 day": 24 * 60 * 60,
}

for label, interval in intervals.items():
    print(f"Monitoring traffic every {label}:")
    monitor_traffic(target_ip, community_string, interval)
    break  # Remove or adjust this line as needed for continuous monitoring