export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-triggered class
  document.querySelectorAll('.scroll-triggered').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

export const addMagneticEffect = () => {
  document.querySelectorAll('.magnetic-effect').forEach((element) => {
    element.addEventListener('mousemove', (e) => {
      const mouseEvent = e as MouseEvent;
      const rect = (e.currentTarget as Element).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      
      (e.currentTarget as HTMLElement).style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    element.addEventListener('mouseleave', (e) => {
      (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
    });
  });
};