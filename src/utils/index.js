export function getStat(pokemon, statName) {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}
