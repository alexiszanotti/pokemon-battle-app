import { getStat } from '../../utils';

export function simulateBattle(teamA, teamB) {
  const result = {
    teamA: { alive: teamA.length, down: 0 },
    teamB: { alive: teamB.length, down: 0 },
    rounds: [],
    winner: null,
  };

  function determineBattleOutcome(a, b, isAFirst) {
    const atkA = getStat(a, 'attack');
    const defA = getStat(a, 'defense');
    const atkB = getStat(b, 'attack');
    const defB = getStat(b, 'defense');
    const speedA = getStat(a, 'speed');
    const speedB = getStat(b, 'speed');

    // El que ataca primero intenta debilitar al rival
    if (isAFirst) {
      if (atkA > defB)
        return {
          winner: a,
          loserTeam: 'B',
        };
      // Si no lo logra, el otro ataca
      if (atkB > defA)
        return {
          winner: b,
          loserTeam: 'A',
        };
      // Si ninguno supera la defensa, gana el más rápido
      return {
        winner: speedA >= speedB ? a : b,
        loserTeam: speedA >= speedB ? 'B' : 'A',
      };
    } else {
      if (atkB > defA)
        return {
          winner: b,
          loserTeam: 'A',
        };
      if (atkA > defB)
        return {
          winner: a,
          loserTeam: 'B',
        };
      return {
        winner: speedB >= speedA ? b : a,
        loserTeam: speedB >= speedA ? 'A' : 'B',
      };
    }
  }

  let iA = 0,
    iB = 0;

  while (iA < teamA.length && iB < teamB.length) {
    const a = teamA[iA];
    const b = teamB[iB];
    const speedA = getStat(a, 'speed');
    const speedB = getStat(b, 'speed');

    const outcome =
      speedA >= speedB ? determineBattleOutcome(a, b, true) : determineBattleOutcome(a, b, false);

    result.rounds.push({
      index: result.rounds.length + 1,
      p1: a.name,
      p2: b.name,
      winner: outcome.winner.name,
    });

    if (outcome.loserTeam === 'A') {
      result.teamA.down++;
      result.teamA.alive--;
      iA++;
    } else {
      result.teamB.down++;
      result.teamB.alive--;
      iB++;
    }
  }

  result.winner = result.teamA.alive > 0 ? 'Team A' : 'Team B';
  return result;
}
