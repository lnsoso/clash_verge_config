// Define main function (script entry)

// 国内DNS服务器
const domesticNameservers = [
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.360.cn/dns-query", // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://dns.google/dns-query", // Google
  "https://8.8.8.8/dns-query", // Google
  "https://8.8.4.4/dns-query", // Google
  "https://cloudflare-dns.com/dns-query", // Cloudflare
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query" // OpenDNS(备)
];
// DNS配置
const dnsConfig = {
  enable: true,
  listen: "0.0.0.0:7899",
  ipv6: true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
  ],
  "default-nameserver": [
    "114.114.114.114",
    "119.29.29.29",
    "8.8.8.8",
    "1.1.1.1",
  ], // "223.6.6.6"
  nameserver: [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers,
  },
};
// 规则集通用配置
const ruleProviderCommon = {
  type: "http",
  format: "yaml",
  interval: 150,
};

// 规则集配置
const ruleProviders = {
  ai: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/ai.yaml",
    path: "./ruleset/lnsoso/ai.yaml",
  },
  Gemini: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Gemini/Gemini.yaml",
    path: "./ruleset/lnsoso/gemini.yaml",
  },
  us: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/us.yaml",
    path: "./ruleset/lnsoso/us.yaml",
  },
  japan: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/japan.yaml",
    path: "./ruleset/lnsoso/japan.yaml",
  },
  porn: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/porn.yaml",
    path: "./ruleset/lnsoso/porn.yaml",
  },
  tiktok: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/tiktok.yaml",
    path: "./ruleset/lnsoso/tiktok.yaml",
  },
  game: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/game.txt",
    path: "./ruleset/lnsoso/game.yaml",
  },
  reject: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    path: "./ruleset/loyalsoldier/reject.yaml",
  },
  icloud: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    path: "./ruleset/loyalsoldier/icloud.yaml",
  },
  apple: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    path: "./ruleset/loyalsoldier/apple.yaml",
  },
  google: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    path: "./ruleset/loyalsoldier/google.yaml",
  },
  spotify: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",
    path: "./ruleset/lnsoso/spotify.yaml",
  },
  proxy: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/lnsoso/clash_verge_config/main/ruleset/proxy.yaml",
    path: "./ruleset/lnsoso/proxy.yaml",
  },
  direct: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    path: "./ruleset/loyalsoldier/direct.yaml",
  },
  private: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    path: "./ruleset/loyalsoldier/private.yaml",
  },
  // "gfw": {
  //   ...ruleProviderCommon,
  //   "behavior": "domain",
  //   "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
  //   "path": "./ruleset/loyalsoldier/gfw.yaml"
  // },
  "tld-not-cn": {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    path: "./ruleset/loyalsoldier/tld-not-cn.yaml",
  },
  telegramcidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    path: "./ruleset/loyalsoldier/telegramcidr.yaml",
  },
  cncidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    path: "./ruleset/loyalsoldier/cncidr.yaml",
  },
  lancidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    path: "./ruleset/loyalsoldier/lancidr.yaml",
  },
  applications: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    path: "./ruleset/loyalsoldier/applications.yaml",
  },
  // "openai": {
  //   ...ruleProviderCommon,
  //   "behavior": "classical",
  //   "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
  //   "path": "./ruleset/blackmatrix7/openai.yaml"
  // }
};

// 规则
const rules = [
  // 自定义规则
  // DNS走代理：国外DoH经代理可达，避免国内直连被墙导致直连域名解析失败
  "DOMAIN-SUFFIX,cloudflare-dns.com,节点选择",
  "DOMAIN-SUFFIX,dns.google,节点选择",
  "IP-CIDR,1.1.1.1/32,节点选择,no-resolve",
  "IP-CIDR,1.0.0.1/32,节点选择,no-resolve",
  "IP-CIDR,8.8.8.8/32,节点选择,no-resolve",
  "IP-CIDR,8.8.4.4/32,节点选择,no-resolve",
  "IP-CIDR,208.67.222.222/32,节点选择,no-resolve",
  "IP-CIDR,208.67.220.220/32,节点选择,no-resolve",
  "RULE-SET,ai,AI美国",
  "RULE-SET,Gemini,AI美国",
  "RULE-SET,japan,JapanProxy",
  "RULE-SET,us,USProxy",
  "RULE-SET,game,游戏",
  "RULE-SET,game,Spotify",
  "RULE-SET,porn,节点选择",
  "RULE-SET,tiktok,TikTok",
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
  "DOMAIN,v2rayse.com,节点选择", // V2rayse节点工具
  // blackmatrix7 规则集
  // "RULE-SET,openai,ChatGPT",
  // Loyalsoldier 规则集
  "RULE-SET,applications,全局直连",
  "RULE-SET,private,全局直连",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,icloud,微软服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,google,谷歌服务",
  "RULE-SET,proxy,节点选择",
  // "RULE-SET,gfw,节点选择",
  // "RULE-SET,tld-not-cn,节点选择",
  "RULE-SET,direct,全局直连",
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "RULE-SET,telegramcidr,电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOIP,CN,全局直连,no-resolve",
  "MATCH,漏网之鱼",
];
// 代理组通用配置
const groupBaseOption = {
  interval: 180,
  timeout: 600,
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};

// 程序入口
function main(config, profileName) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      name: "节点选择",
      type: "select",
      proxies: [
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "JapanProxy",
        "USProxy",
        "HKProxy",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
      ...groupBaseOption,
      name: "TikTok",
      type: "select",
      proxies: [
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "JapanProxy",
        "USProxy",
        "HKProxy",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
      ...groupBaseOption,
      name: "Spotify",
      type: "select",
      proxies: ["延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
      ...groupBaseOption,
      name: "HKProxy",
      type: "select",
      "include-all": true,
      filter: "香港|HK|HongKong|hongkong|港|🇭🇰",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
    },
    {
      ...groupBaseOption,
      name: "JapanProxy",
      type: "select",
      "include-all": true,
      "exclude-filter": "免费",
      filter: "日本|JP|Japan|japan|日|🇯🇵|🎌|🔴",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
    },
    {
      ...groupBaseOption,
      name: "USProxy",
      type: "select",
      "include-all": true,
      filter: "美国|US|us|美|纽约|洛杉矶|🇺🇸|西雅图|unitedstates|united states",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
    },
    {
      // 防止一些烂机场以自己的名字做为 proxy name
      ...groupBaseOption,
      name: profileName,
      type: "select",
      proxies: ["节点选择", "DIRECT"],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
      ...groupBaseOption,
      name: "游戏",
      type: "select",
      proxies: [
        "DIRECT",
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg",
    },
    {
      ...groupBaseOption,
      name: "延迟选优",
      type: "url-test",
      tolerance: 20,
      "include-all": true,
      "exclude-filter": "免费",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    },
    {
      ...groupBaseOption,
      name: "故障转移",
      type: "fallback",
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
    },
    {
      ...groupBaseOption,
      name: "负载均衡(散列)",
      type: "load-balance",
      strategy: "consistent-hashing",
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
    },
    {
      ...groupBaseOption,
      name: "负载均衡(轮询)",
      type: "load-balance",
      strategy: "round-robin",
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
    },
    {
      ...groupBaseOption,
      name: "谷歌服务",
      type: "select",
      proxies: [
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "全局直连",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
    },
    {
      ...groupBaseOption,
      name: "国外媒体",
      type: "select",
      proxies: [
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "全局直连",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    },
    {
      ...groupBaseOption,
      name: "电报消息",
      type: "select",
      proxies: [
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "全局直连",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
    },
    // {
    //   ...groupBaseOption,
    //   "url": "https://chatgpt.com",
    //   "expected-status": "200",
    //   "name": "ChatGPT",
    //   "type": "select",
    //   "include-all": true,
    //   "filter": "美国|美|AD|🇦🇩|AE|🇦🇪|AF|🇦🇫|AG|🇦🇬|AL|🇦🇱|AM|🇦🇲|AO|🇦🇴|AR|🇦🇷|AT|🇦🇹|AU|🇦🇺|AZ|🇦🇿|BA|🇧🇦|BB|🇧🇧|BD|🇧🇩|BE|🇧🇪|BF|🇧🇫|BG|🇧🇬|BH|🇧🇭|BI|🇧🇮|BJ|🇧🇯|BN|🇧🇳|BO|🇧🇴|BR|🇧🇷|BS|🇧🇸|BT|🇧🇹|BW|🇧🇼|BZ|🇧🇿|CA|🇨🇦|CD|🇨🇩|CF|🇨🇫|CG|🇨🇬|CH|🇨🇭|CI|🇨🇮|CL|🇨🇱|CM|🇨🇲|CO|🇨🇴|CR|🇨🇷|CV|🇨🇻|CY|🇨🇾|CZ|🇨🇿|DE|🇩🇪|DJ|🇩🇯|DK|🇩🇰|DM|🇩🇲|DO|🇩🇴|DZ|🇩🇿|EC|🇪🇨|EE|🇪🇪|EG|🇪🇬|ER|🇪🇷|ES|🇪🇸|ET|🇪🇹|FI|🇫🇮|FJ|🇫🇯|FM|🇫🇲|FR|🇫🇷|GA|🇬🇦|GB|🇬🇧|GD|🇬🇩|GE|🇬🇪|GH|🇬🇭|GM|🇬🇲|GN|🇬🇳|GQ|🇬🇶|GR|🇬🇷|GT|🇬🇹|GW|🇬🇼|GY|🇬🇾|HN|🇭🇳|HR|🇭🇷|HT|🇭🇹|HU|🇭🇺|ID|🇮🇩|IE|🇮🇪|IL|🇮🇱|IN|🇮🇳|IQ|🇮🇶|IS|🇮🇸|IT|🇮🇹|JM|🇯🇲|JO|🇯🇴|JP|🇯🇵|KE|🇰🇪|KG|🇰🇬|KH|🇰🇭|KI|🇰🇮|KM|🇰🇲|KN|🇰🇳|KR|🇰🇷|KW|🇰🇼|KZ|🇰🇿|LA|🇱🇦|LB|🇱🇧|LC|🇱🇨|LI|🇱🇮|LK|🇱🇰|LR|🇱🇷|LS|🇱🇸|LT|🇱🇹|LU|🇱🇺|LV|🇱🇻|LY|🇱🇾|MA|🇲🇦|MC|🇲🇨|MD|🇲🇩|ME|🇲🇪|MG|🇲🇬|MH|🇲🇭|MK|🇲🇰|ML|🇲🇱|MM|🇲🇲|MN|🇲🇳|MR|🇲🇷|MT|🇲🇹|MU|🇲🇺|MV|🇲🇻|MW|🇲🇼|MX|🇲🇽|MY|🇲🇾|MZ|🇲🇿|NA|🇳🇦|NE|🇳🇪|NG|🇳🇬|NI|🇳🇮|NL|🇳🇱|NO|🇳🇴|NP|🇳🇵|NR|🇳🇷|NZ|🇳🇿|OM|🇴🇲|PA|🇵🇦|PE|🇵🇪|PG|🇵🇬|PH|🇵🇭|PK|🇵🇰|PL|🇵🇱|PS|🇵🇸|PT|🇵🇹|PW|🇵🇼|PY|🇵🇾|QA|🇶🇦|RO|🇷🇴|RS|🇷🇸|RW|🇷🇼|SA|🇸🇦|SB|🇸🇧|SC|🇸🇨|SD|🇸🇩|SE|🇸🇪|SG|🇸🇬|SI|🇸🇮|SK|🇸🇰|SL|🇸🇱|SM|🇸🇲|SN|🇸🇳|SO|🇸🇴|SR|🇸🇷|SS|🇸🇸|ST|🇸🇹|SV|🇸🇻|SZ|🇸🇿|TD|🇹🇩|TG|🇹🇬|TH|🇹🇭|TJ|🇹🇯|TL|🇹🇱|TM|🇹🇲|TN|🇹🇳|TO|🇹🇴|TR|🇹🇷|TT|🇹🇹|TV|🇹🇻|TW|🇹🇼|TZ|🇹🇿|UA|🇺🇦|UG|🇺🇬|US|🇺🇸|UY|🇺🇾|UZ|🇺🇿|VA|🇻🇦|VC|🇻🇨|VN|🇻🇳|VU|🇻🇺|WS|🇼🇸|YE|🇾🇪|ZA|🇿🇦|ZM|🇿🇲|ZW|🇿🇼",
    //   "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    // },
    {
      ...groupBaseOption,
      url: "https://chatgpt.com",
      "expected-status": "200",
      name: "AI美国",
      type: "select",
      "include-all": true,
      filter: "美国|美|US|🇺🇸|纽约|洛杉矶|加利福尼亚|加州|北美",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
    },
    {
      ...groupBaseOption,
      name: "微软服务",
      type: "select",
      proxies: [
        "全局直连",
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
    },
    {
      ...groupBaseOption,
      name: "苹果服务",
      type: "select",
      proxies: [
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "全局直连",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
    },
    {
      ...groupBaseOption,
      name: "广告过滤",
      type: "select",
      proxies: ["REJECT", "DIRECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg",
    },
    {
      ...groupBaseOption,
      name: "全局直连",
      type: "select",
      proxies: [
        "DIRECT",
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
    },
    {
      ...groupBaseOption,
      name: "全局拦截",
      type: "select",
      proxies: ["REJECT", "DIRECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
    },
    {
      ...groupBaseOption,
      name: "漏网之鱼",
      type: "select",
      proxies: [
        "DIRECT",
        "节点选择",
        "延迟选优",
        "故障转移",
        "负载均衡(散列)",
        "负载均衡(轮询)",
        "全局直连",
      ],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    },
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}

/*
function addGroup(config, group)
{
  if (!config.proxies||!config['proxy-groups']) return config;
  const hkRegex = /港|hk|hongkong|hong kong/;
  const twRegex = /台|tw|taiwan/;
  const jpRegex = /日本|jp|japan/;
  const usRegex = /美|us|unitedstates|united states/;
  const sgRegex = /新|sg|singapore/;
  const otherRegex = /🇭🇰|🇯🇵|🇺🇸|🇸🇬|🇨🇳|港|hk|hongkong|台|tw|taiwan|日|jp|japan|新|sg|singapore|美|us|unitedstates/;

  config.proxies.forEach((proxy) => {
    config['proxy-groups'][18].proxies.push(proxy.name); //全部地区
    config['proxy-groups'][19].proxies.push(proxy.name); //自动选择

    if (hkRegex.test(proxy.name)) {
      config['proxy-groups'][12].proxies.push(proxy.name);
      return;
    } //香港

    if (twRegex.test(proxy.name)) {
      config['proxy-groups'][13].proxies.push(proxy.name);
      return;
    }

    if (jpRegex.test(proxy.name)) {
      config['proxy-groups'][14].proxies.push(proxy.name);
      return;
    }

    if (usRegex.test(proxy.name)) {
      config['proxy-groups'][15].proxies.push(proxy.name);
      return;
    }

    if (sgRegex.test(proxy.name)) {
      config['proxy-groups'][16].proxies.push(proxy.name);
      return;
    }

    if (!otherRegex.test(proxy.name)) {
      config['proxy-groups'][17].proxies.push(proxy.name);
      return;
    } // 其它地区
  });
  return config;
}
*/
