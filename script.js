const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(isOpen));
  navigation.classList.toggle('open', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    menu.focus();
  }
});

const labMembers = [
  'Nilufar Khodzhaeva', 'Sunghyun Ryu', 'Donghyeon Park',
  'Jinkyeong Choi', 'Yejin Noh', 'Donghee Choi',
  'Jaesung Hwang', 'Mogan Gim'
];

document.querySelectorAll('.pub-list li').forEach(item => {
  const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    const parent = node.parentElement;
    if (!parent || parent.closest('a, mark')) return;
    const pattern = new RegExp(`(${labMembers.join('|')})`, 'g');
    if (!pattern.test(node.textContent)) return;
    const fragment = document.createDocumentFragment();
    node.textContent.split(pattern).forEach(part => {
      if (labMembers.includes(part)) {
        const mark = document.createElement('mark');
        mark.className = 'lab';
        mark.textContent = part;
        fragment.append(mark);
      } else {
        fragment.append(document.createTextNode(part));
      }
    });
    node.replaceWith(fragment);
  });
});

document.querySelectorAll('img[src="assets/logo.png"]').forEach((img) => {
  img.addEventListener('error', () => {
    img.src = 'assets/logo.svg';
  }, { once: true });
});

document.querySelectorAll('.profile img[src*="avatar-placeholder.svg"]').forEach((img) => {
  img.setAttribute('src', 'assets/avatar-placeholder.svg');
});

