// Speichert und lädt Spielstände in LocalStorage
const KEY = "wic_game_data";

export function saveGameData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadGameData() {
  try {
    const d = localStorage.getItem(KEY);
    return d ? JSON.parse(d) : null;
  } catch {
    return null;
  }
}
