declare class SDNVlanQOS {
  uuid: string;
  acl: SDNVlanQOSACL[];
  cm: SDNVlanQOSCM[];
  pm: SDNVlanQOSPM;
}
declare enum FlowType {
  UC = 1,
  MC = 2
}
declare class SDNFlow {
  uuid: string;
  name: string;
  flowtype: FlowType;
  constructor();
  static stringToFlowType(type: string): FlowType;
  static flowTypeToString(t: FlowType): string;
}
declare enum SDNVlanType {
  CLIENT = 1,
  UPLINK = 2,
  DEFAULTCLIENT = 3,
  DEFAULTUPLINK = 4
}
interface SDNVlanOptions {
  name?: string;
  admin_state?: boolean;
}
declare class SDNVlan {
  /**
       * The UUID identifying this object
       */
  uuid: string;
  id: number;
  name: string;
  admin_state: boolean;
  ospf: SDNVlanOSPF | null;
  interface: SDNVlanInterface | null;
  igmpsnooping: SDNVlanIGMPSnooping | null;
  qos: SDNVlanQOS | null;
  vlantype: SDNVlanType;
  stp_state: boolean;
  constructor(v?: SDNVlan | null);
  static stringToSDNVlanType(type: string): SDNVlanType;
  static SDNVlanTypeToString(t: SDNVlanType): string;
}
declare class SDNSwitchUser {
  uuid: string;
  name: string;
  role: string;
  privilege: number;
  password_sha512: string;
  password_cleartext: string;
  constructor();
}
declare class SDNIPRange {
  uuid: string;
  range: string;
  clientrangesize: number;
  priority: number;
  constructor(ip?: string | null, size?: number, priority?: number);
  canjoin(r: SDNIPRange): boolean;
  join(r: SDNIPRange): boolean;
  update(r: SDNIPRange): void;
  hasoverlap(r: SDNIPRange): boolean;
  includes(r: SDNIPRange): boolean;
}
declare class SDNIPAllocation {
  uuid: string;
  range: string;
  vlan: number;
  network: SDNNetwork | null;
  pool: SDNIPRange | null;
  constructor(ip: string | null | undefined, network: SDNNetwork | null | undefined, pool: SDNIPRange | null);
}
declare class SDNSwitchPort extends SDNPort {
  physicalport: SDNSwitchPhysicalPort;
  subpos: number;
  model: SubPortModel;
  customcli: string[];
  porttypes: SDNPortType[];
  proxy_arp_state: boolean;
  local_proxy_arp_state: boolean;
  stp_portfast: boolean;
  admin_state: boolean;
  trust_cos: boolean;
  load_interval: number;
  interface_igmp: boolean;
  interface_igmp_fast_leave: boolean;
  interface_igmp_report_flooding: SDNVlan[];
  config: SDNSwitchPortConfig | null;
  isEndpoint1: boolean;
  constructor();
}
declare class SDNSwitchSTP {
  uuid: string;
  mode_pvst: boolean;
  mode_rstp: boolean;
  hello_time: number;
  max_age: number;
  forward_delay: number;
  constructor();
}
declare class SDNSwitchCable extends SDNCable {
  endpoint2: SDNSwitchPort;
  constructor();
}
declare enum SDNPortType {
  CLIENT_ACTIVE = 1,
  UPLINK_ACTIVE = 2,
  CLIENT_UNASSIGNED = 3,
  UPLINK_UNASSIGNED = 4,
  OFFLINE_UNASSIGNED = 5,
  CLIENT = 6
}
declare enum SDNPortColor {
  RED = 1,
  BLUE = 2,
  PURPLE = 3,
  GREY = 4
}
declare class SDNPort {
  uuid: string;
  bandwidth: number;
  tagged: boolean;
  nativevlan: SDNVlan | null;
  vlans: SDNVlan[];
  portType: SDNPortType;
  portColor: SDNPortColor;
  cable: SDNCable | null;
  cableId: string;
  constructor();
  static stringToPortType(type: string): SDNPortType;
  static portTypeToString(t: SDNPortType): string;
  static stringToPortColor(type: string): SDNPortColor;
  static portColortoString(t: SDNPortColor): string;
}
declare class SDNPool {
  uuid: string;
  name: string;
  description: string;
  clientvlans: SDNNumberRange[];
  l3vlans: SDNNumberRange[];
  clientrange: SDNIPRange[];
  l3range: SDNIPRange[];
  multicast: SDNIPRange[];
  management: SDNIPRange[];
  ospfarea: string;
  routerids: SDNIPRange[];
  properties: SDNProperty[];
  allocations: SDNPoolAllocation[];
  constructor();
  demo_allocation1(): SDNPoolAllocation;
  demo_allocation2(): SDNPoolAllocation;
  findclientvlanrange(uuid: string): SDNNumberRange | undefined;
  findl3vlanrange(uuid: string): SDNNumberRange | undefined;
  findclientrange(uuid: string): SDNIPRange | undefined;
  findl3range(uuid: string): SDNIPRange | undefined;
  findmulticast(uuid: string): SDNIPRange | undefined;
  findmanagement(uuid: string): SDNIPRange | undefined;
  findrouterid(uuid: string): SDNIPRange | undefined;
  getallipranges(): SDNIPRange[];
  hasoverlaps(range: SDNIPRange): boolean;
  findallocation(uuid: string): SDNPoolAllocation | undefined;
  update(p: SDNPool): void;
  findPropertyByID(puuid: string): SDNProperty | undefined;
  findPropertyByKey(key: string): SDNProperty | undefined;
}
declare class SDNClientAllocation {
  uuid: string;
  ip: string;
  vlan: SDNVlan | null;
  client: SDNClient;
  constructor(ip: string, vlan: SDNVlan | null);
}
declare enum SDNClientType {
  AUDIO = 1,
  VIDEO = 2,
  EDITOR = 3,
  STORAGE = 4
}
declare class SDNClient {
  uuid: string;
  name: string;
  type: SDNClientType;
  ports: SDNClientPort[];
  senders: SDNSender[];
  receivers: SDNReceiver[];
  vlans: SDNVlan[];
  network: SDNNetwork;
  topologycoordinate: SDNTopologyCoordinate;
  constructor();
  getClientPortById(uuid: string): SDNClientPort | undefined;
  findSender(uuid: string): SDNSender | undefined;
  findReceiver(uuid: string): SDNReceiver | undefined;
  findSenderMC(uuid: string): SDNSenderMC | undefined;
  findReceiverMC(uuid: string): SDNReceiverMC | undefined;
}
declare class SDNClientPortConfig {
  uuid: string;
  fc_state: Port_FCState;
  log_state: boolean;
  admin_state: boolean;
  constructor();
}
declare class SDNVlanQOSCM {
  uuid: string;
  name: string;
  acl: SDNVlanQOSACL;
}
declare class IngressQueueConfig {
  uuid: string;
  queue: number;
  log_state: boolean;
  min: number;
  shared: number;
  resume: number;
  hdrm: number;
  llfc: boolean;
  constructor(t?: SDNIngressQueueTemplate | null);
}
declare class SDNVlanInterface {
  uuid: string;
  admin_state: boolean;
  proxy_arp_state: boolean;
  local_proxy_arp_state: boolean;
  mtu: number;
  ip_multicast_static: boolean;
  network: string | null;
  router_floatingip: string | null;
  vlan_localip: string | null;
  constructor();
}
declare enum EQ_SPState {
  EQ_SP = 1,
  EQ_RR = 2,
  EQ_WERR = 3
}
declare class SDNEgressQueueTemplate {
  uuid: string;
  name: string;
  log_state: boolean;
  minbw: number;
  minburst: number;
  minsp: EQ_SPState;
  maxbw: number;
  maxburst: number;
  maxsp: EQ_SPState;
  maxweight: number;
  constructor(iqt?: SDNEgressQueueTemplate | null);
  update(t: SDNEgressQueueTemplate): void;
  static stringToEQ_SPState(type: string): EQ_SPState;
  static EQ_SPStateToString(t: EQ_SPState): string;
}
declare class SDNSwitchSubPortTemplate {
  uuid: string;
  name: string;
  fcstate: Port_FCState;
  log_state: boolean;
  admin_state: boolean;
  prio_to_iq_map: number[];
  maxbw: number;
  maxburst: number;
  maxiq: number;
  maxeq: number;
  maxuc: number;
  maxmc: number;
  iq: SDNIngressQueueTemplate[];
  eq: SDNEgressQueueTemplate[];
  uc: SDNUniCastQueueTemplate[];
  mc: SDNMultiCastQueueTemplate[];
  constructor(iqt?: SDNSwitchSubPortTemplate | null);
  update(t: SDNSwitchSubPortTemplate): void;
}
declare class SDNSwitchBufferTemplate {
  uuid: string;
  name: string;
  total: number;
  min: number;
  shared: number;
  shared_oversub: number;
  hdrm: number;
  hdrm_oversub: number;
  reserved: number;
  constructor(iqt?: SDNSwitchBufferTemplate | null);
  update(t: SDNSwitchBufferTemplate): void;
}
declare class SDNIngressQueueTemplate {
  uuid: string;
  name: string;
  log_state: boolean;
  min: number;
  shared: number;
  resume: number;
  hdrm: number;
  llfc: boolean;
  constructor(iqt: SDNIngressQueueTemplate | null);
  update(t: SDNIngressQueueTemplate): void;
}
declare class SDNSwitchDefault {
  uuid: string;
  brand: string;
  type: string;
  template: SDNSwitchTemplate;
}
declare class SDNTemplates {
  uuid: string;
  iqtemplates: SDNIngressQueueTemplate[];
  eqtemplates: SDNEgressQueueTemplate[];
  uctemplates: SDNUniCastQueueTemplate[];
  mctemplates: SDNMultiCastQueueTemplate[];
  switchbuffertemplates: SDNSwitchBufferTemplate[];
  switchporttemplates: SDNSwitchSubPortTemplate[];
  switchtemplates: SDNSwitchTemplate[];
  switchdefaults: SDNSwitchDefault[];
  constructor();
}
declare class SDNUniCastQueueTemplate {
  uuid: string;
  name: string;
  log_state: boolean;
  minbw: number;
  minburst: number;
  maxbw: number;
  maxburst: number;
  constructor(iqt?: SDNUniCastQueueTemplate | null);
  update(t: SDNUniCastQueueTemplate): void;
}
declare class SDNMultiCastQueueTemplate {
  uuid: string;
  name: string;
  log_state: boolean;
  minbw: number;
  minburst: number;
  maxbw: number;
  maxburst: number;
  constructor(iqt?: SDNMultiCastQueueTemplate | null);
  update(t: SDNMultiCastQueueTemplate): void;
}
declare class SDNSwitchMemoryPipeTemplate {
  uuid: string;
  pipe: number;
  template: SDNSwitchBufferTemplate;
  constructor();
}
declare class SDNSwitchSubPortDefinition {
  uuid: string;
  subport: number;
  count: number;
  template: SDNSwitchSubPortTemplate;
  porttypes: SDNPortType[];
  porttype: SDNPortType | null;
  constructor();
}
declare class SDNSwitchPortTemplate {
  uuid: string;
  port: number;
  subporttype: SubPortType;
  count: number;
  subports: SDNSwitchSubPortDefinition[];
  constructor();
}
declare class SDNSwitchPortDefault {
  uuid: string;
  porttypes: SDNPortType[];
  subporttypes: SubPortType[];
  atemplate: SDNSwitchSubPortTemplate;
  natemplate: SDNSwitchSubPortTemplate | null;
  constructor();
}
declare class SDNSwitchTemplate {
  uuid: string;
  name: string;
  parent: SDNSwitchTemplate | null;
  memorypipes: SDNSwitchMemoryPipeTemplate[];
  portdefaults: SDNSwitchPortDefault[];
  ports: SDNSwitchPortTemplate[];
  constructor(iqt?: SDNSwitchTemplate | null);
}
declare class SDNSwitchPhysicalPort {
  uuid: string;
  model: PortModel;
  forcebandwidth: boolean;
  switch: SDNSwitch;
  pos: number;
  subports: SDNSwitchPort[];
  constructor(model: PortModel);
  getSubPort(pos: number): SDNSwitchPort | undefined;
  getSubPortById(uuid: string): SDNSwitchPort | undefined;
  getSubPortType(): SubPortType;
}
declare class SDNVlanIGMPSnooping {
  uuid: string;
  admin_state: boolean;
  report_flooding: boolean;
  version: string;
  querier_address: string;
  querier: boolean;
  query_interval: number;
  fast_leave: boolean;
  drop_unknown: boolean;
  proxying: boolean;
  snooping: boolean;
  max_response: number;
  last_member_query_interval: number;
  constructor();
}
declare class SDNSwitchOSPF {
  uuid: string;
  process_id: number;
  router_id: string;
  max_lsa: number;
  redist_static: boolean;
  redist_local: boolean;
  constructor();
}
declare class SDNVlanOSPF {
  uuid: string;
  area: number;
  admin_state: boolean;
  retransmit: number;
  hello: number;
  dead: number;
  cost: number;
  constructor();
}
declare class SDNSwitchBuffer {
  uuid: string;
  pipe: number;
  total: number;
  min: number;
  shared: number;
  shared_oversub: number;
  hdrm: number;
  hdrm_oversub: number;
  reserved: number;
  activeshared: number;
  activehdrm: number;
  activereserved: number;
  constructor(b?: SDNSwitchMemoryPipeTemplate | null);
  copy(b: SDNSwitchBuffer): SDNSwitchBuffer;
}
declare class SDNProperty {
  uuid: string;
  key: string;
  value: string;
  constructor();
}

declare enum Port_FCState {
  NONE = 1,
  PAUSE = 2,
  PFC = 3
}
declare class SDNSwitchPortConfig {
  uuid: string;
  template: SDNSwitchSubPortTemplate | null;
  fcstate: Port_FCState;
  log_state: boolean;
  admin_state: boolean;
  prio_to_iq_map: number[];
  maxbw: number;
  maxburst: number;
  maxiq: number;
  maxeq: number;
  maxuc: number;
  maxmc: number;
  iq: IngressQueueConfig[];
  eq: EgressQueueConfig[];
  uc: UniCastQueueConfig[];
  mc: MultiCastQueueConfig[];
  constructor(t?: SDNSwitchSubPortTemplate | null);
  static stringToPortFCState(type: string): Port_FCState;
  static portFCStateToString(t: Port_FCState): string;
}
declare class SDNVlanQOSPMClass {
  uuid: string;
  name: string;
  cos: number;
  trafficclass: number;
}
declare class SDNVlanQOSPM {
  uuid: string;
  name: string;
  classes: SDNVlanQOSPMClass[];
}
declare enum ReceiverType {
  UC = 1,
  MC = 2
}
declare class SDNReceiverUC {
  uuid: string;
  name: string;
  type: ReceiverType;
  port: number;
  flows: SDNFlow[];
  receiver: SDNReceiver;
  constructor();
  static stringToDestinationType(type: string): ReceiverType;
  static destinationTypeToString(t: ReceiverType): string;
}
declare class SDNPoolIPAllocation {
  uuid: string;
  range: string;
  network: SDNPoolAllocation;
  pool: SDNIPRange | null;
  constructor(ip: string | null | undefined, network: SDNPoolAllocation | null | undefined, pool: SDNIPRange | null);
}
declare class SDNReceiver {
  uuid: string;
  name: string;
  mtu: number;
  network: string | null;
  destinationip: string | null;
  ports: SDNClientPort[];
  vlan: SDNVlan | null;
  mac: string;
  allocation: SDNClientAllocation;
  uc: SDNReceiverUC[];
  mc: SDNReceiverMC[];
  constructor();
  allocate(alloc: SDNClientAllocation): void;
}
declare class UniCastQueueConfig {
  uuid: string;
  queue: number;
  log_state: boolean;
  minbw: number;
  minburst: number;
  maxbw: number;
  maxburst: number;
  constructor(t?: SDNUniCastQueueTemplate | null);
}
declare class SDNFlowDef {
  uuid: string;
  bandwidth: number;
  egresspvalue: number;
  maxburst: number;
  constructor(bandwidth?: number, egresspvalue?: number, maxburst?: number);
}
declare enum MCFLOWTYPE {
  RECEIVER = 1,
  SWITCH = 2
}
declare class SDNFlowMC extends SDNFlow {
  sender: SDNSenderMC;
  mcflowtype: MCFLOWTYPE;
  constructor();
}
declare class SDNFlowMCReceiver extends SDNFlowMC {
  receiver: SDNReceiverMC;
  constructor();
}
declare class SDNFlowMCSwitch extends SDNFlowMC {
  receiver: SDNSwitch;
  vlan: SDNVlan;
  constructor();
}
declare class SDNSender {
  uuid: string;
  name: string;
  mtu: number;
  network: string | null;
  sourceip: string | null;
  ports: SDNClientPort[];
  vlan: SDNVlan | null;
  mac: string;
  allocation: SDNClientAllocation;
  uc: SDNSenderUC[];
  mc: SDNSenderMC[];
  constructor();
  allocate(alloc: SDNClientAllocation): void;
}
declare class MultiCastQueueConfig {
  uuid: string;
  queue: number;
  log_state: boolean;
  minbw: number;
  minburst: number;
  maxbw: number;
  maxburst: number;
  constructor(t?: SDNMultiCastQueueTemplate | null);
}
declare class SDNClientCable extends SDNCable {
  endpoint2: SDNClientPort;
  constructor();
}
declare enum UCSenderProtocol {
  TCP = 1,
  UDP = 2,
  OTHER = 3,
  ALL = 4
}
declare enum SenderType {
  UC = 1,
  MC = 2
}
declare class SDNSenderUC {
  uuid: string;
  name: string;
  protocol: UCSenderProtocol;
  type: SenderType;
  port: number;
  flows: SDNFlow[];
  sender: SDNSender;
  constructor();
  static stringToUCSourceProtocol(type: string): UCSenderProtocol;
  static uCSourceProtocolToString(t: UCSenderProtocol): string;
  static stringToSourceType(type: string): SenderType;
  static sourceTypeToString(t: SenderType): string;
}
declare class SDNVlanQOSACL {
  uuid: string;
  name: string;
  pvalue: number;
}
declare class SDNMCTree {
  uuid: string;
  root: SDNMCTreeNode;
  constructor();
}
declare enum EQ_SPState {
  SP = 1,
  RR = 2,
  WERR = 3
}
declare class EgressQueueConfig {
  uuid: string;
  queue: number;
  log_state: boolean;
  minbw: number;
  minburst: number;
  minsp: EQ_SPState;
  maxbw: number;
  maxburst: number;
  maxsp: EQ_SPState;
  maxweight: number;
  constructor(t?: SDNEgressQueueTemplate | null);
}
declare class SDNClientPort extends SDNPort {
  name: string;
  pos: number;
  config: SDNClientPortConfig | null;
  client: SDNClient;
  constructor();
}
declare enum SDNCableType {
  CLIENT = 1,
  SWITCH = 2
}
declare abstract class SDNCable {
  uuid: string;
  endpoint1: SDNSwitchPort;
  endpoint2: SDNPort;
  cabletype: SDNCableType;
  constructor();
  static cableTypeToString(t: SDNCableType): string;
  static stringToCableType(type: string): SDNCableType;
}
declare class SDNNetworkAllocation {
  uuid: string;
  name: string;
  description: string;
  clientvlans: SDNNumberRange[];
  l3vlans: SDNNumberRange[];
  clientrange: SDNIPRange[];
  l3range: SDNIPRange[];
  clientallocations: SDNIPAllocation[];
  l3allocations: SDNIPAllocation[];
  multicast: SDNIPRange[];
  multicastallocations: SDNIPAllocation[];
  management: SDNIPRange[];
  ospfarea: string;
  routerids: SDNIPRange[];
  constructor(pa?: SDNPoolAllocation | null);
}
declare class SDNTopologyCoordinate {
  x: number;
  y: number;

  constructor(x: number, y: number);
}
declare class SDNSwitch {
  uuid: string;
  model: SwitchModel;
  template: SDNSwitchTemplate | null;
  set_mgmt_ip: boolean;
  mgmtip: string;
  mgmtvlan: SDNVlan | null;
  username: string;
  password: string;
  name: string;
  vdevurl: string;
  enable_http: boolean;
  enable_telnet: boolean;
  enable_ssh: boolean;
  config: string[];
  users: SDNSwitchUser[];
  vlans: SDNVlan[];
  ports: SDNSwitchPhysicalPort[];
  forwardingmode: string;
  routerid: string | null;
  iprouting: boolean;
  ospf: SDNSwitchOSPF | null;
  stp: SDNSwitchSTP | null;
  igmpsnooping: SDNSwitchIGMPSnooping | null;
  customcli: string[];
  memorypipes: SDNSwitchBuffer[];
  properties: SDNProperty[];
  network: SDNNetwork;
  bcli: BCLICategory[];
  multicastnetworks: SDNIPAllocation[];
  clientallocations: SDNClientAllocation[];
  multicastnetworkallocations: SDNClientAllocation[];
  topologycoordinate: SDNTopologyCoordinate;
  getPort(p: number): SDNSwitchPhysicalPort | undefined;
  getFirstClientVlan(): SDNVlan | null;
  getDefaultClientVlan(): SDNVlan | null;
  getClientVlan(id: number): SDNVlan | undefined;
  getClientVlanByUUID(uuid: string): SDNVlan | undefined;
  getClientVlansByUUID(uuids: string[]): SDNVlan[];
  getDefaultUplinkVlan(): SDNVlan | null;
  getVlans(vlanids: string[]): SDNVlan[];
  getSwitchPortById(uuid: string): SDNSwitchPort | undefined;
  getSwitchPort(p: number, sp: number): SDNSwitchPort | undefined;
  findPropertyByID(puuid: string): SDNProperty | undefined;
  findPropertyByKey(key: string): SDNProperty | undefined;
}
declare class SDNReceiverMC {
  uuid: string;
  name: string;
  type: ReceiverType;
  flows: SDNFlow[];
  receiver: SDNReceiver;
  constructor();
}
declare class SDNNumberRange {
  private uuid_;
  private start_;
  private count_;
  private priority_;
  constructor(start?: number, count?: number, priority?: number);
  update(r: SDNNumberRange): void;
  readonly uuid: string;
  start: number;
  count: number;
  readonly end: number;
  priority: number;
  inrange(n: number): boolean;
  isinrangeoradjacent(val: number): boolean;
  appendtorange(val: number): boolean;
  hasoverlaps(r: SDNNumberRange): boolean;
  join(r: SDNNumberRange): void;
  static converttorange(arr: number[]): SDNNumberRange[];
  toString(): string;
  toArray(): number[];
}
declare class SDNSwitchIGMPSnooping {
  uuid: string;
  admin_state: boolean;
  report_flooding: boolean;
  constructor();
}
declare enum MCSourceProtocol {
  UDP = 2,
  OTHER = 3,
  ALL = 4
}
declare class SDNSenderMC {
  uuid: string;
  name: string;
  protocol: MCSourceProtocol;
  type: SenderType;
  port: number;
  mcaddress: string | null;
  flows: SDNFlow[];
  sender: SDNSender;
  flowdef: SDNFlowDef | null;
  mctree: SDNMCTree;
  constructor();
  static stringToMCSourceProtocol(type: string): MCSourceProtocol;
  static mCSourceProtocolToString(t: MCSourceProtocol): string;
}
declare enum MCTreeNodeType {
  PORT = 1,
  VLAN = 2
}
declare class SDNMCTreeNode {
  uuid: string;
  children: SDNMCTreeNode[];
  type: MCTreeNodeType;
  constructor();
}
declare enum MCTreeNodeDirection {
  EGRESS = 1,
  INGRESS = 2
}
declare class SDNMCTreeNodePort extends SDNMCTreeNode {
  port: SDNPort;
  direction: MCTreeNodeDirection;
  pvalue: number;
  constructor();
}
declare class SDNMCTreeNodeVlan extends SDNMCTreeNode {
  vlan: SDNVlan;
  constructor();
}
declare class SDNFlowUC extends SDNFlow {
  sender: SDNSenderUC;
  receiver: SDNReceiverUC;
  constructor();
}
declare class SDNPoolAllocation {
  uuid: string;
  name: string;
  description: string;
  clientvlans: SDNNumberRange[];
  l3vlans: SDNNumberRange[];
  clientrange: SDNIPRange[];
  l3range: SDNIPRange[];
  multicast: SDNIPRange[];
  management: SDNIPRange[];
  ospfarea: string;
  routerids: SDNIPRange[];
  properties: SDNProperty[];
  update(p: SDNPoolAllocation): void;
  constructor();
  hasoverlaps(pa: SDNPoolAllocation): boolean;
  getallipranges(): SDNIPRange[];
  findclientvlanrange(uuid: string): SDNNumberRange | undefined;
  findl3vlanrange(uuid: string): SDNNumberRange | undefined;
  findclientrange(uuid: string): SDNIPRange | undefined;
  findl3range(uuid: string): SDNIPRange | undefined;
  findmulticast(uuid: string): SDNIPRange | undefined;
  findmanagement(uuid: string): SDNIPRange | undefined;
  findrouterid(uuid: string): SDNIPRange | undefined;
  findPropertyByID(puuid: string): SDNProperty | undefined;
  findPropertyByKey(key: string): SDNProperty | undefined;
}
declare enum SDNIGMPVersion {
  V1 = 1,
  V2 = 2,
  V3 = 3
}
declare class SDNNetwork {
  static stringToIGMPVersion(type: string): SDNIGMPVersion;
  static IGMPVersionToString(t: SDNIGMPVersion): string;
  uuid: string;
  switches: SDNSwitch[];
  name: string;
  allocation: SDNNetworkAllocation;
  clientcables: SDNClientCable[];
  switchcables: SDNSwitchCable[];
  clients: SDNClient[];
  flows: SDNFlow[];
  igmpversion: SDNIGMPVersion;
  constructor();
  getSwitchPortByID(uuid: string): SDNSwitchPort | undefined;
  getClientPortByID(uuid: string): SDNClientPort | undefined;
  getMCSenderByID(uuid: string): SDNSenderMC | undefined;
  getMCReceiverByID(uuid: string): SDNReceiverMC | undefined;
  findClientCableByID(uuid: string): SDNClientCable | undefined;
  findSwitchCableByID(uuid: string): SDNSwitchCable | undefined;
}
declare class SDIClient {
  uuid: string;
  name: string;
  client: SDNClient;
  hardware: string;
  sources: SDISource[];
  destinations: SDIDestination[];
  constructor();
}
declare class SDIDestinationSDN {
  destination: SDNReceiver;
  priority: number;
  color: string;
  prefered: boolean;
}
declare class SDIDestination {
  uuid: string;
  name: string;
  client: SDIClient;
  destinations: SDIDestinationSDN[];
  bncid: number;
  sdp: SDP;
  connection: SDIConnection | null;
  constructor();
}
declare class SDISourceSDN {
  destination: SDNSender;
  priority: number;
  color: string;
  prefered: boolean;
}
declare class SDISource {
  uuid: string;
  name: string;
  client: SDIClient;
  source: SDISourceSDN[];
  bncid: number;
  sdp: SDP;
  constructor();
}
declare class SDIConnection {
  uuid: string;
  name: string;
  sdp: SDP;
  source: SDISource;
  destination: SDIDestination;
  constructor();
}
declare class SDPConnectionData {
  nettype: string;
  addresstype: string;
  connectionaddress: string;
}
declare class SDPTiming {
  starttime: number;
  endtime: number;
  repeat_interval: number;
  active_duration: number;
  offsets: number[];
}
declare class SDP {
  version: number;
  username: string;
  sessionid: string;
  sessionversion: string;
  nettype: string;
  addrtype: string;
  unicast_address: string;
  sessionname: string;
  sessioninformation: string;
  uri: string;
  email: string;
  phone: string;
  connectiondata: SDPConnectionData;
  bandwidth: string;
  timings: SDPTiming[];
  timezone: string;
  encryption: string[];
}
declare class SwitchDetailPort {
  uuid: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
declare class SwitchDetailImage {
  uuid: string;
  location: string;
  width: number;
  height: number;
}
declare class SwitchDetailLayout {
  uuid: string;
  image: SwitchDetailImage;
  ports: SwitchDetailPort[];
  constructor();
}
declare enum BShellRegisterType {
  REGISTER = 1,
  TABLE = 2,
  PORT = 3
}
declare class SDNNumberParameter {
  disabled: boolean;
  values: number[];
  constructor(disabled?: boolean, values?: number[]);
}
declare class SDNLPParameterValue {
  cli_port: string;
  lp: number;
  constructor(cli_port?: string, lp?: number);
}
declare class SDNLPParameter {
  disabled: boolean;
  values: SDNLPParameterValue[];
  constructor(disabled?: boolean, values?: SDNLPParameterValue[]);
}
declare class BShellRegisterParameters {
  memorypipe: SDNNumberParameter;
  spindex: SDNNumberParameter;
  cpu: SDNNumberParameter;
  lb: SDNNumberParameter;
  lp: SDNLPParameter;
  lp1: SDNLPParameter;
  lp2: SDNLPParameter;
  pgindex: SDNNumberParameter;
  nindex: SDNNumberParameter;
  priorityindex: SDNNumberParameter;
  cpu_nindex: SDNNumberParameter;
  lb_nindex: SDNNumberParameter;
  mc_nindex: SDNNumberParameter;
  globalprofile: SDNNumberParameter;
  profile: SDNNumberParameter;
  memorypipe1: SDNNumberParameter;
  table_min: SDNNumberParameter;
  table_max: SDNNumberParameter;
  constructor();
}
declare class BShellRegisterField {
  name: string;
  value: number;
  maxvalue: number;
  constructor(name?: string, value?: number, maxvalue?: number);
}
declare class BShellRegister {
  name: string;
  type: BShellRegisterType;
  disabled: boolean;
  readonly: boolean;
  parameters: BShellRegisterParameters;
  fields: BShellRegisterField[];
  constructor(
    name?: string,
    type?: BShellRegisterType,
    disabled?: boolean,
    readonly?: boolean,
    parameters?: BShellRegisterParameters | null,
    fields?: BShellRegisterField[]
  );
}
interface BCLIFunctionInputValue {
  min_value: number;
  max_value: number;
  default: number;
  units: string;
  pos: number;
}
declare class BCLIFunctionInputSelect {
  values: string[];
  default: string;
  units: string;
  pos: number;
}
declare class BCLIFunctionParameters {
  memorypipe: SDNNumberParameter;
  spindex: SDNNumberParameter;
  globalprofile: SDNNumberParameter;
  profile: SDNNumberParameter;
  priority: SDNNumberParameter;
  cpu: SDNNumberParameter;
  lb: SDNNumberParameter;
  lp: SDNLPParameter;
  pgindex: SDNNumberParameter;
  nindex: SDNNumberParameter;
  priorityindex: SDNNumberParameter;
  cpu_nindex: SDNNumberParameter;
  lb_nindex: SDNNumberParameter;
  mc_nindex: SDNNumberParameter;
  constructor();
}
declare class BCLIFunction {
  name: string;
  disabled: boolean;
  readonly: boolean;
  inputValue: BCLIFunctionInputValue[];
  inputSelect: BCLIFunctionInputSelect[];
  parameters: BCLIFunctionParameters;
  constructor();
}
declare class BCLICategory {
  uuid: string;
  value: string;
  viewValue: string;
  disabled: boolean;
  default: number;
  bshellreg: BShellRegister[];
  functions: BCLIFunction[];
  constructor(value?: string, viewValue?: string, disabled?: boolean, defaultnum?: number);
}

declare enum PortType {
  P_1000BASE_T = 1,
  P_2_5GBASE_T = 2,
  P_5GBASE_T = 3,
  P_10GBASE_T = 4,
  P_25GBASE_T = 5,
  P_40GBASE_T = 6,
  P_10GBASE_SFP = 7,
  P_25GBASE_SFP28 = 8,
  P_40GBASE_QSFP = 9,
  P_50GBASE_QSFP28 = 10,
  P_100GBASE_QSFP28 = 11
}
declare class PortModel {
  uuid: string;
  slot: number;
  pos: number;
  name: string;
  subports: SubPortModel[];
  porttype: PortType;
  hassubports: boolean;
}
declare enum SubPortType {
  P_1000BASE_T = 1,
  P_2_5GBASE_T = 2,
  P_5GBASE_T = 3,
  P_10GBASE_T = 4,
  P_25GBASE_T = 5,
  P_40GBASE_T = 6,
  P_1000BASE_SFP = 7,
  P_10GBASE_SFP = 8,
  P_25GBASE_SFP28 = 9,
  P_40GBASE_QSFP = 10,
  P_50GBASE_QSFP28 = 11,
  P_100GBASE_QSFP28 = 12,
  P_40GBASE_QSFP_TO_4X10GBASE_SFP = 13,
  P_100GBASE_QSFP28_TO_4X10GBASE_SFP = 14,
  P_100GBASE_QSFP28_TO_4X25GBASE_SFP28 = 15,
  P_100GBASE_QSFP28_TO_2X50GBASE_QSFP28 = 16
}
declare class SubPortModel {
  uuid: string;
  subpos: number;
  cliname: string;
  subporttype: SubPortType;
  pipe: number;
  mccounterbase: number;
  uccounterbase: number;
  memorypipe: number;
  lp: number;
  mmu: number;
}
declare class SwitchModel {
  uuid: string;
  brand: string;
  type: string;
  chipset: string;
  softwareversion: string;
  ports: PortModel[];
  vdevdevicehw: number;
  vdevmodules: number[];
  switchdetaillayout: SwitchDetailLayout | null;
  generate_vlanigmpsnooping: (vlan: any) => string;
  generate_switchinterface: (interf: any) => string;
  generate_qos: (sw: any) => string;
  generate_bclicategories: () => BCLICategory[];
  constructor();
}
declare enum VDevProtocol {
  TELNET = 1,
  JSONRPC = 2
}
declare class VDevConfig {
  id: number;
  port: number;
  devicehw: number;
  ip: string;
  switchport: number;
  modules: number[];
  username: string;
  password: string;
  protocol: VDevProtocol;
  databasename: string;
  pid: number;
  protocolstring(): string;
}
declare class VDevManagerConfig {
  vdevstartport: number;
  vdevapp: string;
}
