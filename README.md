Problèmes rencontrés :
Pour ouvrir un channel il me faut un autre noeud avec lequel communiqué.

C'est pour ca que j'ai voulu utilisé Polar, mais j'ai rencontré un problème, on peut lire dans la FAQ de polar:
`
Can I use it on mainnet or testnet?
Unfortunately, Polar was built to improve the experience of developers building applications for Lightning and Bitcoin. To obtain the immediate feedback loop necessary to be productive, you'll need to be able to mine blocks as fast as possible. Waiting 10 minutes for your channel to open just won't cut it.
`

En gros, je suis obligé d'utilisé le réseau regtest.
Je passe donc mon réseau en regtest mais j'ai compris la chose suivante :
le réseau Regtest utilisé par mon groupe de nœuds dans Polar et mon Regtest local ne sont pas les mêmes réseaux. Chaque instance de Regtest fonctionne de manière isolée, ce qui signifie que les blocs minés dans un environnement Regtest ne seront pas visibles dans un autre et que ces environnements n'interagissent pas entre eux.


Donc je me suis dit que j'allais copié collé non pas mon cert.tls et mon admin.macaroonn, mais celui d'alice. Cependant en voulant interagir avec Bob en passant par l'API LND, j'ai obtenu une erreur :
{
  "message": "self-signed certificate"
}

j'ai rajouté cette ligne dans la création de mon instance axios :
rejectUnauthorized: false,

mais je me suis rendu compte que ma grosse erreur était d'avoir laissé :

const apiUrl = 'https://localhost:8080';

Je l'ai ensuite remplacé par: const apiUrl = 'https://localhost:8080'; qui est l'hôte REST associé à Alice. En effet, si on souhaite utiliser les nœuds LND sur Polar, on doit également faire nos appels API à ces nœuds spécifiques, et non à un nœud LND local. Chaque nœud dans Polar a sa propre API, accessible via un port spécifique attribué par Polar.
