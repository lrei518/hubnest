/*
  =========================================
  网站主JavaScript文件
  =========================================
  功能：提供网站的核心交互功能
  用途：处理搜索、导航、主题切换等用户交互
  模块：
    - 搜索功能模块
    - 卡片点击模块
    - 分类导航模块
    - 主题切换模块
    - 用户登录模块
*/

document.addEventListener('DOMContentLoaded', function () {
  
  /*
    =========================================
    搜索功能模块
    =========================================
    功能：实现实时搜索过滤
    用途：根据用户输入的关键词过滤显示相关卡片
    实现：监听输入事件，匹配卡片标题
  */
  
  // 搜索功能实现
  const searchInput = document.querySelector('.search-input'); // 获取搜索输入框元素
  const searchTabs = document.querySelectorAll('.search-tab'); // 获取搜索标签元素
  
  // 搜索标签点击功能
  const searchEngineSelector = document.getElementById('search-engine-selector');
  const engineSelect = document.querySelector('.engine-select');
  
  if (searchTabs.length > 0) {
    searchTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // 移除所有标签的active类
        searchTabs.forEach(t => t.classList.remove('active'));
        // 为当前点击的标签添加active类
        this.classList.add('active');
        
        // 根据点击的标签更新搜索框placeholder和显示搜索引擎选择器
        if (this.textContent === '站内搜索') {
          searchInput.placeholder = '站内搜索...';
          // 隐藏搜索引擎选择器
          if (searchEngineSelector) {
            searchEngineSelector.style.display = 'none';
          }
        } else if (this.textContent === '全网搜索') {
          searchInput.placeholder = '全网搜索...';
          // 显示搜索引擎选择器
          if (searchEngineSelector) {
            searchEngineSelector.style.display = 'flex';
          }
        }
      });
    });
  }
  
  // 搜索按钮点击功能 - 根据当前激活的标签和选择的搜索引擎执行不同的搜索
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
      const keyword = searchInput.value.trim();
      if (keyword) {
        const activeTab = document.querySelector('.search-tab.active');
        if (activeTab && activeTab.textContent === '全网搜索') {
          // 全网搜索：根据选择的搜索引擎进行搜索
          const selectedEngine = engineSelect ? engineSelect.value : 'baidu';
          let searchUrl = '';
          
          switch(selectedEngine) {
            case 'baidu':
              searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`;
              break;
            case 'google':
              searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
              break;
            case 'bing':
              searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`;
              break;
            case 'duckduckgo':
              searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(keyword)}`;
              break;
            case 'qwant':
              searchUrl = `https://www.qwant.com/?q=${encodeURIComponent(keyword)}`;
              break;
            default:
              searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`;
          }
          
          window.open(searchUrl, '_blank');
        } else {
          // 站内搜索：保持原有的站内搜索功能
          // 这里不需要额外处理，因为input事件已经处理了站内搜索
        }
      }
    });
  }
  
  // 回车键搜索功能
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const keyword = this.value.trim();
        if (keyword) {
          const activeTab = document.querySelector('.search-tab.active');
          if (activeTab && activeTab.textContent === '全网搜索') {
            // 全网搜索：根据选择的搜索引擎进行搜索
            const selectedEngine = engineSelect ? engineSelect.value : 'baidu';
            let searchUrl = '';
            
            switch(selectedEngine) {
              case 'baidu':
                searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`;
                break;
              case 'google':
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
                break;
              case 'bing':
                searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`;
                break;
              case 'duckduckgo':
                searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(keyword)}`;
                break;
              case 'qwant':
                searchUrl = `https://www.qwant.com/?q=${encodeURIComponent(keyword)}`;
                break;
              default:
                searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`;
            }
            
            window.open(searchUrl, '_blank');
          } else {
            // 站内搜索：保持原有的站内搜索功能
            // 这里不需要额外处理，因为input事件已经处理了站内搜索
          }
        }
      }
    });
  }
  
  if (searchInput) { // 确保搜索框存在，避免空指针错误
    searchInput.addEventListener('input', function () { // 监听输入事件，实时响应用户输入
      const keyword = this.value.trim().toLowerCase(); // 获取输入关键词并转为小写，标准化匹配
      document.querySelectorAll('.card').forEach(card => { // 遍历所有卡片元素
        const title = card.querySelector('.card-title'); // 获取卡片标题元素
        if (title && title.textContent.toLowerCase().includes(keyword)) { // 检查标题是否包含关键词
          card.style.display = 'flex';  // 显示匹配的卡片，使用flex布局保持排列
        } else {
          card.style.display = 'none';  // 隐藏不匹配的卡片，优化显示空间
        }
      });
    });
  }

  /*
    =========================================
    卡片点击模块
    =========================================
    功能：处理卡片点击事件
    用途：点击卡片时在新窗口打开对应网站
    实现：读取data-url属性值作为跳转链接
  */
  
  // 卡片点击功能
  document.querySelectorAll('.card').forEach(card => { // 获取所有卡片元素并遍历
    card.addEventListener('click', function (e) { // 为每个卡片添加点击事件监听器
      const url = this.getAttribute('data-url'); // 从data-url属性获取跳转链接
      if (url) { // 确保链接存在，避免空链接
        window.open(url, '_blank');  // 在新标签页打开链接，不离开当前网站
      }
    });
  });

  // 初始化收藏功能
  setupFavoriteSite();

  /*
    =========================================
    分类导航模块
    =========================================
    功能：实现左侧分类导航的交互功能
    用途：点击分类时滚动到对应内容区域，更新活跃状态
    包含：
      - 子分类点击处理
      - 首页点击处理
  */

  function setupCategoryNavigation() {
    /*
      菜单分类点击处理
      功能：处理左侧菜单项的点击事件
      用途：实现分类导航和内容区域的关联
    */
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // 检查是否是首页菜单项
            if (item.textContent.trim() === '首页') {
                e.preventDefault();  // 阻止默认行为
                
                // 移除所有菜单项的active类（重置状态）
                document.querySelectorAll('.menu-item').forEach(menuItem => {
                    menuItem.classList.remove('active');
                });
                
                // 为首页菜单项添加active类（标记首页为活跃）
                item.classList.add('active');
                
                // 滚动到页面顶部（平滑滚动）
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // 处理其他菜单项
                e.preventDefault();  // 阻止默认行为
                
                // 移除所有菜单项的active类（重置状态）
                document.querySelectorAll('.menu-item').forEach(menuItem => {
                    menuItem.classList.remove('active');
                });
                
                // 为当前点击的菜单项添加active类（标记活跃状态）
                item.classList.add('active');
                
                // 获取分类名称（从文本内容中提取）
                const categoryName = item.textContent.trim();
                
                // 调用通用的分类点击处理函数（跳转到对应内容区域）
                handleCategoryClick(categoryName);
            }
        });
    });
    
    /*
      首页点击处理
      功能：处理首页菜单项的点击事件
      用途：滚动到页面顶部，重置导航状态
    */
    const homeMenuItem = document.querySelector('.menu-item:first-child');
    if (homeMenuItem) {
        homeMenuItem.addEventListener('click', (e) => {
            e.preventDefault();  // 阻止默认行为
            
            // 移除所有菜单项的active类（重置状态）
            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // 为首页菜单项添加active类（标记首页为活跃）
            homeMenuItem.classList.add('active');
            
            // 滚动到页面顶部（平滑滚动）
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
  }

  /*
    =========================================
    分类点击处理函数
    =========================================
    功能：根据分类名称滚动到对应的内容模块
    用途：实现左侧导航与右侧内容的联动
    参数：categoryName - 分类名称（从菜单项获取）
    实现：
      - 使用映射表匹配分类名称
      - 查找对应的DOM元素
      - 平滑滚动到目标位置
  */

  function handleCategoryClick(categoryName) {
    /*
      分类映射表
      功能：建立左侧菜单分类与右侧内容模块的对应关系
      用途：解决菜单名称与模块标签可能不一致的问题
      结构：键为菜单分类名称，值为模块标签文本
    */
    const categoryMap = {
    '自定义网站': '自定义常用网站',
    'AI智能': 'AI智能',
    '搜索引擎': '搜索引擎',
    '视频下载': '视频下载',
    '游戏在线玩': '游戏在线玩',
    '影视剧下载': '影视剧下载',
    '软件下载': '软件下载',
    '单机游戏下载': '单机游戏下载',
    '超级工具': '超级工具'
};
    
    // 通过映射表获取目标模块的标签文本
    const targetCategory = categoryMap[categoryName];
    
    if (targetCategory) {
        /*
          查找目标模块
          功能：在DOM中查找对应的模块元素
          实现：
            - 获取所有模块标题（包括.module-title和h2标签）
            - 匹配文本内容
            - 找到最近的父级模块
        */
        const moduleTitleElements = [
            ...document.querySelectorAll('.module-title'),
            ...document.querySelectorAll('h2')
        ];
        let targetModule = null;
        
        moduleTitleElements.forEach(title => {
            // 检查模块标题文本是否匹配目标分类
            if (title.textContent.trim() === targetCategory) {
                targetModule = title.closest('.module');
            }
        });
        
        if (targetModule) {
            /*
              滚动到目标位置
              功能：平滑滚动到目标模块
              实现：
                - 计算目标位置的偏移量
                - 考虑固定头部的高度
                - 使用平滑滚动效果
            */
            const offsetTop = targetModule.offsetTop - 150;  // 预留顶部空间
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }
  }
  
  /*
    =========================================
    主题切换模块
    =========================================
    功能：实现明暗主题切换
    用途：根据用户偏好切换网站的明暗主题
    实现：
      - 监听主题切换按钮点击事件
      - 切换body元素的dark-mode类
      - 保存用户偏好到localStorage
  */
  
  function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
      // 检查用户之前是否保存了主题偏好
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
      }
      
      // 添加点击事件监听器
      themeToggle.addEventListener('click', () => {
        // 切换dark-mode类
        body.classList.toggle('dark-mode');
        
        // 保存用户偏好到localStorage
        if (body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }

  /*
    =========================================
    收藏本站功能模块
    =========================================
    功能：实现收藏本站功能
    用途：让用户可以快速收藏网站到浏览器书签
    实现：
      - 监听收藏按钮点击事件
      - 使用浏览器原生收藏功能或提示用户快捷键
  */
  
  function setupFavoriteSite() {
    // 处理index.html中的收藏链接
    const favoriteLink = document.getElementById('favoriteSite');
    if (favoriteLink) {
        favoriteLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 尝试使用现代浏览器的收藏API
            if (window.sidebar && window.sidebar.addPanel) {
                // Firefox
                window.sidebar.addPanel(document.title, window.location.href, '');
            } else if (window.external && ('AddFavorite' in window.external)) {
                // IE
                window.external.AddFavorite(window.location.href, document.title);
            } else {
                // 其他浏览器，显示提示信息
                alert('请使用 Ctrl+D (Windows) 或 Cmd+D (Mac) 来收藏此网站');
            }
        });
    }
    
    // 处理page_content.html中的收藏按钮
    const favoriteBtn = document.getElementById('favoriteSite');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 尝试使用现代浏览器的收藏API
            if (window.sidebar && window.sidebar.addPanel) {
                // Firefox
                window.sidebar.addPanel(document.title, window.location.href, '');
            } else if (window.external && ('AddFavorite' in window.external)) {
                // IE
                window.external.AddFavorite(window.location.href, document.title);
            } else {
                // 其他浏览器，显示提示信息
                alert('请使用 Ctrl+D (Windows) 或 Cmd+D (Mac) 来收藏此网站');
            }
        });
    }
  }

  

  /*
    =========================================
    添加网站功能模块
    =========================================
    功能：允许用户添加自定义网站
    用途：让用户可以添加自己喜欢的网站到导航页面
    实现：
      - 创建模态框表单
      - 验证用户输入
      - 动态添加网站卡片
  */
  
  function setupAddWebsite() {
    const addWebsiteCard = document.getElementById('addWebsiteCard');
    
    if (!addWebsiteCard) return;
    
    // 创建模态框
    function createModal() {
      // 检查模态框是否已存在
      if (document.getElementById('addWebsiteModal')) return;
      
      const modal = document.createElement('div');
      modal.id = 'addWebsiteModal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>添加网站</h2>
          <form id="addWebsiteForm">
            <div class="form-group">
              <label for="websiteName">网站名称:</label>
              <input type="text" id="websiteName" name="websiteName" required>
            </div>
            <div class="form-group">
              <label for="websiteUrl">网站链接:</label>
              <input type="url" id="websiteUrl" name="websiteUrl" required>
            </div>
            <div class="form-group">
              <label for="websiteDescription">网站描述:</label>
              <textarea id="websiteDescription" name="websiteDescription"></textarea>
            </div>
            <div class="form-group">
              <label for="websiteCategory">分类:</label>
              <select id="websiteCategory" name="websiteCategory" required>
                <option value="">请选择分类</option>
                <option value="自定义网站">自定义网站</option>
                <option value="AI智能">AI智能</option>
                <option value="搜索引擎">搜索引擎</option>
                <option value="视频下载">视频下载</option>
                <option value="游戏在线玩">游戏在线玩</option>
                <option value="影视剧下载">影视剧下载</option>
                <option value="软件下载">软件下载</option>
                <option value="单机游戏下载">单机游戏下载</option>
                <option value="超级工具">超级工具</option>
              </select>
            </div>
            <div class="form-group">
              <label for="websiteIcon">网站图标 (可选):</label>
              <input type="text" id="websiteIcon" name="websiteIcon" placeholder="输入图标URL或Emoji">
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="directUrl" name="directUrl">
              <label for="directUrl">直接跳转（不通过中转页）</label>
            </div>
            <button type="submit">添加网站</button>
          </form>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // 添加事件监听器
      const closeBtn = modal.querySelector('.close');
      const closeModal = () => {
        modal.style.display = 'none';
      };
      
      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // 处理表单提交
      const form = document.getElementById('addWebsiteForm');
      if (form) {
        form.addEventListener('submit', handleFormSubmit);
      }
      
      // 直接跳转复选框事件
      const directUrlCheckbox = document.getElementById('directUrl');
      directUrlCheckbox.addEventListener('change', function() {
        const urlInput = document.getElementById('websiteUrl');
        if (this.checked) {
          urlInput.placeholder = '请输入完整的网站URL（如：https://www.example.com）';
        } else {
          urlInput.placeholder = '请输入网站URL';
        }
      });
    }
    
    // 关闭模态框
    function closeModal() {
      const modal = document.getElementById('addWebsiteModal');
      if (modal) {
        modal.style.display = 'none';
      }
    }
    
    // 处理表单提交
    function handleFormSubmit(e) {
      e.preventDefault();
      
      const name = document.getElementById('websiteName').value;
      const url = document.getElementById('websiteUrl').value;
      const description = document.getElementById('websiteDescription').value;
      const category = document.getElementById('websiteCategory').value;
      const icon = document.getElementById('websiteIcon').value;
      const directUrl = document.getElementById('directUrl').checked;
      
      // 验证URL
      if (!isValidUrl(url)) {
        alert('请输入有效的网站链接');
        return;
      }
      
      // 生成唯一ID
      const id = generateUniqueId();
      
      // 添加网站卡片到网格
      addWebsiteCardToGrid(id, name, url, description, category, icon, directUrl);
      
      // 保存到localStorage
      saveCustomWebsite(id, name, url, description, category, icon, directUrl);
      
      // 关闭模态框并重置表单
      closeModal();
      document.getElementById('addWebsiteForm').reset();
      
      alert('网站添加成功！');
    }
    
    // 验证URL格式
    function isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    }
    
    // 验证是否为内部URL（中转页）
    function isValidInternalUrl(url) {
      return url.startsWith('http://localhost') || url.startsWith('https://yourdomain.com/go.html?url=');
    }
    
    // 生成唯一ID
    function generateUniqueId() {
      return 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // 添加网站卡片到网格
    function addWebsiteCardToGrid(id, name, url, description, category, icon, directUrl) {
      // 查找对应分类的模块
      const modules = document.querySelectorAll('.module');
      let targetModule = null;
      
      modules.forEach(module => {
        const title = module.querySelector('.module-title, h2');
        if (title && title.textContent.trim() === (category === '自定义网站' ? '自定义常用网站' : category)) {
          targetModule = module;
        }
      });
      
      if (!targetModule) {
        alert('未找到对应的分类模块');
        return;
      }
      
      // 创建卡片元素
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-url', directUrl ? url : `go.html?url=${encodeURIComponent(url)}`);
      card.setAttribute('data-id', id);
      
      // 设置图标
      let iconHtml = '';
      if (icon) {
        if (icon.startsWith('http')) {
          iconHtml = `<img src="${icon}" alt="${name}" class="card-icon">`;
        } else {
          iconHtml = `<span class="card-icon">${icon}</span>`;
        }
      } else {
        iconHtml = '<span class="card-icon">🌐</span>';
      }
      
      card.innerHTML = `
        ${iconHtml}
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description || '暂无描述'}</p>
        </div>
        <button class="delete-btn" title="删除网站">×</button>
      `;
      
      // 添加点击事件
      card.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
      });
      
      // 添加删除按钮事件
      const deleteBtn = card.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('确定要删除这个网站吗？')) {
          card.remove();
          deleteCustomWebsite(id);
        }
      });
      
      // 添加到模块的网格中
      const grid = targetModule.querySelector('.grid');
      if (grid) {
        grid.appendChild(card);
      }
    }
    
    // 保存自定义网站到localStorage
    function saveCustomWebsite(id, name, url, description, category, icon, directUrl) {
      const customSites = JSON.parse(localStorage.getItem('customSites') || '[]');
      customSites.push({ id, name, url, description, category, icon, directUrl });
      localStorage.setItem('customSites', JSON.stringify(customSites));
    }
    
    // 删除自定义网站
    function deleteCustomWebsite(id) {
      const customSites = JSON.parse(localStorage.getItem('customSites') || '[]');
      const updatedSites = customSites.filter(site => site.id !== id);
      localStorage.setItem('customSites', JSON.stringify(updatedSites));
    }
    
    // 加载自定义网站
    function loadCustomWebsites() {
      const customSites = JSON.parse(localStorage.getItem('customSites') || '[]');
      customSites.forEach(site => {
        addWebsiteCardToGrid(site.id, site.name, site.url, site.description, site.category, site.icon, site.directUrl);
      });
    }
    
    // 添加网站卡片点击事件
    if (addWebsiteCard) {
      addWebsiteCard.addEventListener('click', function() {
        createModal();
        const modal = document.getElementById('addWebsiteModal');
        if (modal) {
          modal.style.display = 'block';
        }
      });
    }
    
    // 页面加载时加载自定义网站
    loadCustomWebsites();
  }

  /*
    =========================================
    分类选择功能模块
    =========================================
    功能：处理添加网站表单中的分类选择
    用途：根据主分类选择显示对应的子分类
    实现：
      - 监听主分类选择事件
      - 动态更新子分类选项
  */
  
  function setupCategorySelection() {
    const primaryCategorySelect = document.getElementById('websiteCategory');
    const subCategorySelect = document.getElementById('websiteSubCategory');
    
    if (!primaryCategorySelect || !subCategorySelect) return;
    
    // 分类映射表
    const categoryMap = {
      '自定义网站': [],
      'AI智能': ['AI工具', 'AI绘画', 'AI写作', 'AI对话'],
      '搜索引擎': ['综合搜索', '图片搜索', '学术搜索', '资源搜索'],
      '视频下载': ['在线下载', '客户端下载'],
      '游戏在线玩': ['小游戏', '大型游戏'],
      '影视剧下载': ['电影', '电视剧', '动漫'],
      '软件下载': ['系统工具', '多媒体', '安全软件', '办公软件'],
      '单机游戏下载': ['动作游戏', '角色扮演', '策略游戏', '休闲游戏'],
      '超级工具': ['实用工具', '开发工具', '设计工具']
    };
    
    // 主分类选择事件
    primaryCategorySelect.addEventListener('change', function() {
      const selectedCategory = this.value;
      const subCategories = categoryMap[selectedCategory] || [];
      
      // 清空子分类选项
      subCategorySelect.innerHTML = '<option value="">请选择子分类</option>';
      
      // 添加子分类选项
      subCategories.forEach(subCategory => {
        const option = document.createElement('option');
        option.value = subCategory;
        option.textContent = subCategory;
        subCategorySelect.appendChild(option);
      });
      
      // 显示或隐藏子分类选择
      const subCategoryGroup = subCategorySelect.closest('.form-group');
      if (subCategories.length > 0) {
        subCategoryGroup.style.display = 'block';
      } else {
        subCategoryGroup.style.display = 'none';
      }
    });
  }

  // 设置按钮下拉菜单功能实现
  function setupSettingsMenu() {
    // 清除搜索历史功能
    const clearSearchHistoryBtn = document.getElementById('clearSearchHistory');
    if (clearSearchHistoryBtn) {
      clearSearchHistoryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // 清空搜索输入框
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.value = '';
          // 触发input事件以更新搜索结果
          searchInput.dispatchEvent(new Event('input'));
        }
        // 显示提示信息
        alert('搜索历史已清除');
      });
    }

    // 重置自定义网站功能
    const resetCustomSitesBtn = document.getElementById('resetCustomSites');
    if (resetCustomSitesBtn) {
      resetCustomSitesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('确定要重置所有自定义网站吗？此操作不可恢复。')) {
          localStorage.removeItem('customSites');
          // 重新加载页面以应用更改
          location.reload();
        }
      });
    }

    // 导出设置功能
    const exportSettingsBtn = document.getElementById('exportSettings');
    if (exportSettingsBtn) {
      exportSettingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const settings = {
          customSites: JSON.parse(localStorage.getItem('customSites') || '[]'),
          theme: localStorage.getItem('theme') || 'light'
        };
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "website_settings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
    }

    // 导入设置功能
    const importSettingsBtn = document.getElementById('importSettings');
    if (importSettingsBtn) {
      importSettingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = e => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = function(e) {
            try {
              const settings = JSON.parse(e.target.result);
              if (settings.customSites) {
                localStorage.setItem('customSites', JSON.stringify(settings.customSites));
              }
              if (settings.theme) {
                localStorage.setItem('theme', settings.theme);
              }
              alert('设置导入成功！');
              location.reload();
            } catch (error) {
              alert('导入失败：无效的设置文件');
            }
          };
          reader.readAsText(file);
        };
        
        input.click();
      });
    }
  }

  // 页面访问计数器功能实现
  function setupPageCounter() {
    // 获取当前计数
    let visitCount = localStorage.getItem('visitCount') || 0;
    // 增加计数
    visitCount = parseInt(visitCount) + 1;
    // 保存回localStorage
    localStorage.setItem('visitCount', visitCount);
    
    // 同时记录访问时间
    const visitLog = JSON.parse(localStorage.getItem('visitLog') || '[]');
    const now = new Date();
    visitLog.push({
      timestamp: now.toISOString(),
      date: now.toLocaleDateString('zh-CN'),
      time: now.toLocaleTimeString('zh-CN')
    });
    
    // 只保留最近100条记录以避免localStorage过大
    if (visitLog.length > 100) {
      visitLog.shift();
    }
    
    localStorage.setItem('visitLog', JSON.stringify(visitLog));
  }

  // 帮助功能实现
  function setupHelp() {
    const helpButton = document.getElementById('helpButton');
    if (helpButton) {
      helpButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 创建帮助模态框
        const modal = document.createElement('div');
        modal.id = 'helpModal';
        modal.className = 'modal';
        modal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h2>帮助中心</h2>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body">
              <div class="help-section">
                <h3>网站功能介绍</h3>
                <p>这是一个集成了多种实用网站导航的平台，帮助您快速访问各类在线工具和服务。</p>
              </div>
              
              <div class="help-section">
                <h3>主要功能</h3>
                <ul>
                  <li><strong>搜索功能</strong>：支持站内搜索和全网搜索，快速找到您需要的网站</li>
                  <li><strong>分类导航</strong>：左侧边栏提供清晰的分类导航，方便浏览各类网站</li>
                  <li><strong>主题切换</strong>：点击右上角按钮可在浅色和深色主题间切换</li>
                  <li><strong>自定义网站</strong>：可以添加您常用的网站到"自定义常用网站"模块</li>
                  <li><strong>收藏本站</strong>：一键收藏本网站，方便下次访问</li>
                </ul>
              </div>
              
              <div class="help-section">
                <h3>使用技巧</h3>
                <ul>
                  <li>使用搜索框快速查找网站，支持模糊匹配</li>
                  <li>点击卡片可直接访问对应网站</li>
                  <li>在"自定义常用网站"模块中点击"+"号可以添加您常用的网站</li>
                  <li>通过设置菜单可以导出/导入您的自定义设置</li>
                </ul>
              </div>
              
              <div class="help-section">
                <h3>联系我们</h3>
                <p>如有任何问题或建议，请通过以下方式联系我们：</p>
                <p>📧 邮箱：lrei518@sina.com</p>
              </div>
            </div>
          </div>
        `;
        
        // 添加模态框到页面
        document.body.appendChild(modal);
        
        // 显示模态框
        modal.style.display = 'block';
        
        // 关闭模态框功能
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
          modal.style.display = 'none';
          document.body.removeChild(modal);
        };
        
        // 点击模态框外部关闭
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
          }
        };
      });
    }
  }

  // 页面加载完成后初始化各个功能模块
  try {
    setupCategoryNavigation();
    setupThemeToggle();
    setupAddWebsite();
    setupCategorySelection();
    setupSettingsMenu();
    setupHelp();
    setupPageCounter(); // 初始化页面访问计数器
  } catch (error) {
    console.error('初始化功能模块时出错:', error);
  }
});