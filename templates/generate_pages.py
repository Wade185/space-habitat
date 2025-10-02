names = [
    "aegaeon","aegir","antheaoede","callisto","ceres","chaldene","cyllene","daphnis","dia",
    "dione","enceladus","epimetheus","erinome","eris","erriapus","euanthe","eukelade",
    "euporie","europa","eurydome","farbauti","ganymede","harpalyke","hermippe","hyperion",
    "lijiraq","loge","lysithea","megaclite","metis","mimas","mneme","mundilfari","narvi",
    "nereid","neso","nix","oberon","ophelia","orthosie","pallene","pan","pandora","pasiphae",
    "phoebe","pluto","polydeuces","praxidike","prometheus","prospero","proteus","rhea",
    "setebos","siarnaq","sinope","skathi","suttungr","sycorax","tarvos","telesto","thelxinoe",
    "themisto","tethys","thalassa","titan","titania","triton","umbriel","uranus","venus",
    "ymir","mars","moon","phobos"
]

template = open("template.html").read()

for name in names:
    html = template.replace("{{name}}", name.capitalize())
    with open(f"{name}.html", "w") as f:
        f.write(html)

print("✅ All pages generated!")
