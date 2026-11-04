const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const weekdayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
let lastRenderedSecond = '';

const beijingTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23'
});

// 将 Intl 返回的字段统一格式化，确保日期和时间来自同一个东八区时刻。
function render() {
  const parts = beijingTimeFormatter.formatToParts(new Date());
  const fields = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const year = Number(fields.year);
  const month = Number(fields.month);
  const day = Number(fields.day);
  const hour = fields.hour.padStart(2, '0');
  const minute = fields.minute.padStart(2, '0');
  const second = fields.second.padStart(2, '0');
  const renderedSecond = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  // 250ms 检查一次，仅在显示的秒或日期发生变化时更新 DOM。
  if (renderedSecond === lastRenderedSecond) return;
  lastRenderedSecond = renderedSecond;

  const weekday = weekdayNames[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  timeElement.textContent = `${hour}:${minute}:${second}`;
  dateElement.textContent = `${year}年${fields.month}月${fields.day}日 ${weekday}`;
}

render();
window.setInterval(render, 250);
