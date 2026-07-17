import { mkdir, writeFile, readFile, readdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const site = 'https://neverway.wiki';
const updated = 'July 17, 2026';

const pages = [
  {
    path: 'guides', label: 'Guides', eyebrow: 'Guide Index',
    title: 'Neverway Guides: Prologue Help, Platforms, Features, and FAQ',
    description: 'Browse verified Neverway guides for the free Prologue, release date, PC and Switch, system requirements, controls, launch fixes, playtime, and features.',
    answer: 'Start with the free Prologue hub if you are playing now. For the full October 2026 release, use the release, platform, and feature hubs to separate confirmed information from unannounced details.',
    sections: [
      ['Prologue and troubleshooting', cards([['/demo/','Prologue overview'],['/demo/game-wont-launch/','Game will not launch'],['/demo/change-controls/','Change controls'],['/demo/mouse-support/','Mouse support'],['/demo/system-requirements/','PC requirements'],['/demo/save-transfer/','Save transfer status']])],
      ['Release and platforms', '<p>Neverway has an October 2026 release window for PC and Nintendo Switch. No exact day, PS5 version, Xbox version, or Game Pass release is announced. Use the focused pages below for the latest verified status.</p>'+cards([['/release-date/','Release date'],['/platforms/','Platform hub'],['/platforms/pc/','PC and Steam'],['/platforms/nintendo-switch/','Nintendo Switch'],['/platforms/ps5/','PS5 status'],['/platforms/xbox/','Xbox status'],['/platforms/steam-deck/','Steam Deck status']])],
      ['Gameplay and story', '<p>The official feature set includes farming, fishing, crafting, decorating, relationships with 10+ characters, and top-down action combat. The developers estimate about 20 hours for the main story and describe it as a game with a beginning and an end.</p>'+cards([['/features/','Features overview'],['/features/multiplayer/','Single-player status'],['/features/story-length/','Ending and post-game status'],['/demo/how-long/','Story length'],['/faq/','Verified FAQ']])]
    ], faq: [['Where should new players start?','Use the free Prologue hub, then check controls, requirements, and launch fixes.'],['Are all database pages open?','No. Item, quest, character, and route pages remain out of the index until their facts are verified.']], sources: officialSources()
  },
  {
    path: 'release-date', label: 'Release Date', eyebrow: 'Release Status',
    title: 'Neverway Release Date: October 2026 Window and Exact-Date Status',
    description: 'Neverway is scheduled for October 2026 on PC and Nintendo Switch. The exact release day and price are not yet announced.',
    answer: 'Neverway is planned for October 2026 on PC and Nintendo Switch. An exact day has not been announced on the official site, Steam listing, or Nintendo release-window trailer.',
    sections: [
      ['What is officially confirmed', '<p>The official game site states that Neverway is launching in October 2026 for PC and Switch. Steam also shows October 2026, and Nintendo published a Switch trailer using the same month. Until a day appears on one of those primary sources, October is a release window rather than a complete date.</p>'],
      ['What you can play now', '<p>The full game is not yet available, but Steam offers a free Neverway Prologue. The preview introduces Fiona and the story-led tone before the larger farming and life-sim structure. Wishlist the separate full-game listing for a Steam release notification.</p>'],
      ['Launch details still pending', '<p>The exact day, price, pre-order timing, Switch eShop details, and final cross-platform feature comparison remain unannounced. Steam currently lists Windows, macOS, and SteamOS + Linux, while PS5 and Xbox versions are not announced. Check primary storefronts before relying on retailer dates.</p>']
    ], faq: [['What month does Neverway release?','October 2026.'],['Is there an exact release day?','No exact day is listed on the official sources reviewed on July 17, 2026.'],['Which platforms launch in October?','PC and Nintendo Switch are confirmed.']], sources: officialSources()
  },
  {
    path: 'features', label: 'Features', eyebrow: 'Feature Hub',
    title: 'Neverway Features: Story, Farming, Romance, Combat, and Multiplayer',
    description: 'Explore confirmed Neverway features including a 20-hour story estimate, farming, fishing, crafting, romance, combat, time blocks, and single-player status.',
    answer: 'Neverway blends a story-led horror RPG with farming, fishing, crafting, decorating, relationships, and fast-paced top-down combat. It is currently listed as single-player.',
    sections: [
      ['Life sim and relationships', '<p>The official description includes farming, fishing, crafting, preparing meals, decorating a homestead, paying a mortgage, and meeting or dating more than 10 characters. Each character has a routine and storyline, and bonds unlock buffs or combat abilities.</p>'],
      ['Story and time structure', '<p>The developers currently estimate roughly 20 hours for the main story, with optional detours making it longer. They describe it as a story game with a beginning and an end. Days advance through morning, afternoon, and evening blocks when the player chooses to move time forward.</p>'],
      ['Combat and player choice', '<p>Combat is top-down and fast paced, with crafted items, abilities, and relationship unlocks shaping a build. Steam tags include multiple endings, but exact routes and requirements should wait for launch verification. Browse the focused status pages below for questions with confirmed answers.</p>'+cards([['/features/multiplayer/','Single-player and multiplayer status'],['/features/story-length/','Ending and post-game status'],['/demo/how-long/','Current story-length estimate'],['/romance/','Romance hub']])]
    ], faq: [['Can you date characters?','Yes. Official descriptions say players can meet or date 10+ characters.'],['Does Neverway have combat?','Yes. It has fast-paced top-down combat and customizable abilities.'],['Is it co-op?','No co-op or multiplayer mode is currently listed.']], sources: officialSources()
  },
  {
    path: 'faq', label: 'FAQ', eyebrow: 'Verified FAQ',
    title: 'Neverway FAQ: Release Date, Prologue, Platforms, Length, and Co-op',
    description: 'Verified answers to Neverway release date, free Prologue, PC and Switch platforms, PS5 and Xbox status, story length, co-op, controls, and save transfer.',
    answer: 'Neverway launches in October 2026 for PC and Nintendo Switch. The free Prologue is playable on Steam now, while an exact release day has not been announced.',
    sections: [
      ['Release and platform answers', '<h3>Is Neverway out?</h3><p>The full game is not out. Its public window is October 2026, and the free Steam Prologue is available now.</p><h3>Is it on PS5 or Xbox?</h3><p>No PlayStation or Xbox version has been announced. PC and Nintendo Switch are the confirmed platforms.</p><h3>Does it support Mac or Linux?</h3><p>Steam includes macOS and SteamOS + Linux requirement tabs alongside Windows.</p>'],
      ['Gameplay answers', '<h3>Is Neverway a farming game?</h3><p>Farming is one part of a story-led horror life sim and action RPG. The game also includes fishing, crafting, relationships, decorating, and combat.</p><h3>Is it multiplayer?</h3><p>Steam lists single-player and does not list co-op or multiplayer.</p><h3>How long is it?</h3><p>The developers currently estimate about 20 hours for the main story, with optional content extending playtime.</p>'],
      ['Prologue and technical answers', '<h3>Can controls be changed?</h3><p>Yes. Open Options, Gameplay, then Controls. Mouse buttons can also be bound.</p><h3>What if the Prologue will not launch?</h3><p>The official FAQ recommends testing <code>/gldevice:Vulkan</code> or <code>/gldevice:D3D11</code> separately in Steam launch options.</p><h3>Will the save carry over?</h3><p>Prologue save transfer is not confirmed. Steam Cloud does not by itself guarantee an import into the full game.</p>']
    ], faq: [['When does Neverway release?','October 2026; an exact day is not yet announced.'],['What platforms is Neverway on?','PC and Nintendo Switch are confirmed.'],['Is Neverway co-op?','No. It is currently listed as single-player.'],['Is there a demo?','Yes. Steam offers a free Neverway Prologue.'],['Can I remap controls?','Yes. Use Options, Gameplay, then Controls.']], sources: officialSources()
  },
  {
    path: 'demo', label: 'Prologue', eyebrow: 'Free Prologue Hub',
    title: 'Neverway Prologue Guide: Download, Length, Controls, and Fixes',
    description: 'Play the free Neverway Prologue on Steam and find verified help for controls, mouse input, launch errors, system requirements, length, and save transfer.',
    answer: 'Neverway has a free playable Prologue on Steam. It is the current public preview of the game, while the full PC and Nintendo Switch release is planned for October 2026.',
    sections: [
      ['Where to download the Prologue', `<p>Open the <a href="https://store.steampowered.com/app/2318330/Neverway/" rel="noreferrer">official Neverway Steam page</a> and use the <strong>Download Neverway Prologue</strong> button. The Prologue is a free preview, not the full October release. The official site also links players to the same public Prologue.</p><p>Steam currently lists the full game as unreleased. Wishlist the main game separately if you want a launch notification.</p>`],
      ['What the Prologue is for', '<p>The Prologue introduces Fiona and the tone of the story before the broader farm and life-sim structure opens up. Treat it as a story-led preview rather than a complete farming sandbox. Progress, content limits, and balance can differ from the final build.</p><p>Before playing, check the minimum PC requirements and choose a controller or remapped keyboard setup. If the game does not open, use the developer-published launch-option fixes linked below.</p>'],
      ['Most useful Prologue help', cards([
        ['/demo/game-wont-launch/','Fix a launch failure'], ['/demo/change-controls/','Change controls'], ['/demo/mouse-support/','Use mouse buttons'], ['/demo/system-requirements/','Check PC requirements'], ['/demo/how-long/','Prologue and full-game length'], ['/demo/save-transfer/','Save transfer status']
      ])]
    ],
    faq: [['Is Neverway playable now?','Yes. The free Prologue is playable on Steam; the full game is planned for October 2026.'],['Is the Prologue the full game?','No. It is a limited story preview of the unreleased full game.'],['Is the Prologue on Nintendo Switch?','The public download currently promoted by the official site is the Steam Prologue. A Switch Prologue has not been announced on the official pages checked for this update.']],
    sources: officialSources()
  },
  {
    path: 'demo/game-wont-launch', label: 'Game Won’t Launch', eyebrow: 'Official Fix',
    title: 'Neverway Prologue Won’t Launch: Vulkan and D3D11 Fixes',
    description: 'Fix Neverway Prologue launch problems with the official Vulkan or D3D11 launch options, then check Windows 11 Smart App Control and system requirements.',
    answer: 'If Neverway Prologue will not launch, the developers recommend adding either /gldevice:Vulkan or /gldevice:D3D11 to Steam launch options. Try one option at a time, not both together.',
    sections: [
      ['Fix 1: select a graphics device', '<ol><li>Open Steam Library and right-click <strong>Neverway Prologue</strong>.</li><li>Select <strong>Properties</strong>, then <strong>General</strong>.</li><li>Enter <code>/gldevice:Vulkan</code> in Launch Options and start the game.</li><li>If it still fails, replace that text with <code>/gldevice:D3D11</code> and test again.</li></ol><p>These are the two launch strings published in the game’s official FAQ. Remove the option after testing if it makes no difference.</p>'],
      ['Fix 2: Windows 11 blocking', '<p>The official FAQ also notes that Windows 11 Smart App Control can block startup. Check Windows Security notifications first so you know whether Windows actually blocked the executable. Turning off a security feature changes protection for the whole device, so use that as a last resort and only if the block is confirmed.</p>'],
      ['If neither option works', '<p>Confirm that the PC meets the minimum 64-bit OS, 2.0 GHz processor, 2 GB RAM, Shader Model 3.0 graphics, DirectX 11, and 1 GB storage requirements. Update the graphics driver, verify the game files in Steam, and include OS, GPU, launch option tested, and the crash point in a bug report. The developers direct bug reports to the Steam forum or official Discord.</p>']
    ], faq: [['Should I type both launch options?','No. Test Vulkan and D3D11 separately.'],['Where are Steam launch options?','Right-click the Prologue in your Steam Library, choose Properties, then General.']], sources: officialSources()
  },
  {
    path: 'demo/change-controls', label: 'Change Controls', eyebrow: 'Input Guide',
    title: 'How to Change Neverway Controls and Remap Inputs',
    description: 'Change Neverway Prologue keyboard, controller, or mouse bindings from Gameplay > Controls, with troubleshooting for confusing button layouts.',
    answer: 'You can remap Neverway Prologue inputs from the main menu: open Options, choose Gameplay, then Controls. The developer’s official FAQ confirms customizable input.',
    sections: [
      ['Open the control menu', '<ol><li>Return to the Prologue main menu.</li><li>Open <strong>Options</strong>.</li><li>Select <strong>Gameplay</strong>.</li><li>Open <strong>Controls</strong> and choose the action you want to rebind.</li></ol><p>Set important actions first: movement, confirm/cancel, interaction, dodge or defensive input, and menu navigation. Test the new layout before continuing a story sequence.</p>'],
      ['Keyboard, controller, and mouse', '<p>Steam describes combat as optimized for keyboard or controller, and the official FAQ confirms that mouse buttons can be assigned in Controls. If controller confirm and cancel feel reversed, remap them to match the layout you use most often. Steam community posts show this is a real point of confusion for some Xbox-layout users.</p>'],
      ['When a binding does not stick', '<p>Apply the change, leave the menu, then reopen Controls to verify it was saved. Disconnect extra controllers if Steam is switching devices, and check Steam Input settings if the game displays prompts for a different controller family. Record the exact device and action when reporting a binding bug.</p>']
    ], faq: [['Can I use a keyboard?','Yes. Steam says combat is optimized for keyboard or controller.'],['Can I bind mouse buttons?','Yes. The official FAQ says mouse buttons can be bound in the Controls settings.']], sources: officialSources()
  },
  {
    path: 'demo/mouse-support', label: 'Mouse Support', eyebrow: 'Input Status',
    title: 'Does Neverway Support Mouse Controls and Mouse Button Binding?',
    description: 'Neverway supports binding mouse buttons in the Controls settings. Learn what is confirmed and how to configure mouse input in the Prologue.',
    answer: 'Yes. Neverway’s official FAQ confirms that mouse buttons can be bound under Controls settings. This confirms mouse-button binding, but does not promise that every menu or action is designed for mouse-only play.',
    sections: [
      ['How to bind a mouse button', '<p>From the main menu, open <strong>Options → Gameplay → Controls</strong>. Select the action, then press the mouse button you want to assign. Use a keyboard key for any action that does not accept the desired mouse input.</p>'],
      ['What “mouse support” means here', '<p>The confirmed statement is specifically about binding mouse buttons. Steam separately says the fast-paced combat is optimized for keyboard or controller. Players looking for click-to-move, mouse-only navigation, or full cursor support should test those behaviors in the free Prologue instead of assuming they are included.</p>'],
      ['Recommended PC setup', '<p>A practical setup keeps movement on the keyboard and places frequently used combat or interaction actions on accessible mouse buttons. After rebinding, test both gameplay and menus. If prompts do not update, note whether Steam Input or controller software is active before reporting the issue.</p>']
    ], faq: [['Is Neverway mouse-only?','That is not confirmed. Mouse-button binding is confirmed; full mouse-only operation is not stated.'],['Where do I change mouse buttons?','Open Options, Gameplay, then Controls from the main menu.']], sources: officialSources()
  },
  {
    path: 'demo/system-requirements', label: 'System Requirements', eyebrow: 'PC Requirements',
    title: 'Neverway PC System Requirements for Windows, Mac, and Linux',
    description: 'Check the official Neverway minimum PC requirements: 64-bit OS, 2 GHz CPU, 2 GB RAM, DirectX 11 graphics, and 1 GB storage.',
    answer: 'Neverway’s Steam minimum for Windows is a 64-bit OS, 2.0 GHz processor, 2 GB RAM, Shader Model 3.0-capable graphics with 256 MB video memory, DirectX 11, and 1 GB storage.',
    sections: [
      ['Official Windows minimum', '<ul><li>64-bit processor and operating system</li><li>Windows 7 or later</li><li>2.0 GHz processor</li><li>2 GB RAM</li><li>256 MB video memory with Shader Model 3.0 support</li><li>DirectX 11</li><li>1 GB available storage</li></ul><p>The recommended listing adds Vulkan-capable graphics. Requirements can change before launch, so recheck Steam when the full game releases.</p>'],
      ['Mac and Linux status', '<p>Steam provides Windows, macOS, and SteamOS + Linux requirement tabs and lists the game for those desktop systems. The official game site summarizes the launch as “PC and Switch.” Exact Mac models, macOS versions, and Linux distribution support should be verified on Steam closer to release.</p>'],
      ['Before downloading the Prologue', '<p>Keep more than the listed 1 GB free for updates and temporary installation files. If startup fails on a compatible Windows PC, try the developer’s Vulkan or D3D11 launch options. Laptop users should confirm the game is using the intended graphics adapter.</p>']
    ], faq: [['How much storage does Neverway need?','Steam currently lists 1 GB available space as the minimum.'],['Does Neverway require 64-bit Windows?','Yes. The Steam minimum requires a 64-bit processor and operating system.']], sources: officialSources()
  },
  {
    path: 'demo/how-long', label: 'How Long', eyebrow: 'Length Guide',
    title: 'How Long Is Neverway? Prologue and Full Story Length',
    description: 'The developers estimate Neverway’s main story at about 20 hours, with a longer playtime for optional detours and life-sim systems.',
    answer: 'The developers currently estimate about 20 hours for Neverway’s main story. Optional detours and deeper use of the game’s systems can make a playthrough substantially longer.',
    sections: [
      ['Full-game estimate', '<p>In an official Steam community update celebrating 500,000 wishlists, the team described 20 hours as the current main-story estimate. They also stressed that playtime is difficult to predict and depends on optional content.</p><p>Neverway is primarily a story game with a beginning and an end. It should not be treated as an endless farming sandbox, even though farming, fishing, crafting, decorating, relationships, and optional detours can extend a run.</p>'],
      ['How long is the Prologue?', '<p>The team has not published a universal completion time for the Prologue. It is a limited opening preview, and playtime varies with reading speed and exploration. Use it to judge tone, input, and performance rather than to estimate the entire 20-hour story directly.</p>'],
      ['What changes playtime', '<p>Relationship storylines, exploration, optional routes, crafting, farm activity, combat retries, and completion goals can all add time. The final achievement list and exact optional-content count are not yet enough to support a reliable 100% estimate.</p>']
    ], faq: [['Is Neverway endless?','No. The developers describe it as primarily a story game with a beginning and an end.'],['Is 20 hours guaranteed?','No. It is the team’s current estimate and can change with playstyle or development.']], sources: officialSources()
  },
  {
    path: 'demo/save-transfer', label: 'Save Transfer', eyebrow: 'Carryover Status',
    title: 'Does Neverway Prologue Save Progress Carry Over to the Full Game?',
    description: 'Neverway Prologue save transfer to the October 2026 full game is not currently confirmed. See what to expect and how to preserve your save.',
    answer: 'Prologue-to-full-game save transfer has not been confirmed on the official Neverway site or Steam page checked on July 17, 2026. Do not assume progress will carry into the October release.',
    sections: [
      ['Current official status', '<p>The Steam page advertises the free Prologue and separately lists the unreleased main game, but it does not state that Prologue saves transfer. Because a Prologue can differ in story triggers, data format, and balance, lack of a statement should be treated as unconfirmed—not as a yes.</p>'],
      ['What Steam Cloud confirms', '<p>The main Steam listing shows Steam Cloud as a feature. That means supported save data can synchronize between compatible Steam installations; it does not by itself mean a Prologue save imports into a different full-game build.</p>'],
      ['What players should do', '<p>Keep the Prologue installed and avoid deleting local data if the save matters to you. Before launch, check official patch notes or FAQ wording for “save carryover,” “save transfer,” or “import.” Start the full game expecting a new save unless the developers announce otherwise.</p>']
    ], faq: [['Does Steam Cloud guarantee carryover?','No. Cloud synchronization and importing a Prologue save into the full game are different features.'],['Should I replay the Prologue at launch?','Wait for official transfer guidance. The safest expectation is that the full game may start separately.']], sources: officialSources()
  },
  {
    path: 'platforms', label: 'Platforms', eyebrow: 'Platform Hub',
    title: 'Neverway Platforms: PC, Nintendo Switch, PS5, and Xbox Status',
    description: 'Neverway is confirmed for PC and Nintendo Switch in October 2026. Check Windows, Mac, Linux, PS5, Xbox, Steam Deck, and multiplayer status.',
    answer: 'Neverway is officially planned for PC and Nintendo Switch in October 2026. Steam lists Windows, macOS, and SteamOS + Linux. PS5 and Xbox versions have not been announced.',
    sections: [
      ['Confirmed launch platforms', '<p>The official Neverway site states “PC and Switch.” The Steam listing provides Windows, macOS, and SteamOS + Linux tabs, while Nintendo has published a Switch release trailer. No exact October day is listed yet.</p>'],
      ['Platform status pages', cards([['/platforms/pc/','PC and Steam'],['/platforms/nintendo-switch/','Nintendo Switch'],['/platforms/ps5/','PS5 status'],['/platforms/xbox/','Xbox status'],['/platforms/steam-deck/','Steam Deck status']])],
      ['Features that are confirmed', '<p>Steam lists single-player, Steam Achievements, Steam Cloud, and Family Sharing. The store page does not list online co-op, local co-op, or multiplayer. Language and feature availability can differ on Switch, so wait for the final eShop listing before assuming parity.</p>']
    ], faq: [['Is Neverway on PC?','Yes. PC is confirmed, and Steam lists Windows, macOS, and SteamOS + Linux.'],['Is Neverway on console?','Nintendo Switch is confirmed. PlayStation and Xbox are not announced.']], sources: officialSources()
  },
  {
    path: 'platforms/pc', label: 'PC', eyebrow: 'Confirmed Platform',
    title: 'Neverway PC Release: Steam, Windows, Mac, Linux, and Features',
    description: 'Neverway is coming to PC through Steam in October 2026 with Windows, macOS, Linux, achievements, cloud saves, and controller support listed.',
    answer: 'Neverway is confirmed for PC in October 2026. Steam lists Windows, macOS, and SteamOS + Linux, plus single-player, achievements, Steam Cloud, and Family Sharing.',
    sections: [
      ['Steam release status', '<p>The full game is not yet released, but it can be wishlisted on Steam and the free Prologue can be downloaded now. Steam currently shows an October 2026 window rather than a specific day or price.</p>'],
      ['PC features', '<p>The store lists Steam Achievements and Steam Cloud. Combat is described as optimized for keyboard or controller, and the official FAQ confirms customizable controls and mouse-button binding. Full Steam Deck verification has not been posted.</p>'],
      ['Languages and requirements', '<p>Steam lists interface and subtitle support for English, Japanese, Brazilian Portuguese, Simplified Chinese, Spanish (Spain), and Russian, with no full voice column marked. The Windows minimum is modest, but requirements may change before release.</p>']
    ], faq: [['Can I play before launch?','Yes. The free Neverway Prologue is available through the main Steam page.'],['Does the PC version have cloud saves?','Steam currently lists Steam Cloud for Neverway.']], sources: officialSources()
  },
  {
    path: 'platforms/nintendo-switch', label: 'Nintendo Switch', eyebrow: 'Confirmed Console',
    title: 'Neverway Nintendo Switch Release Date and Version Status',
    description: 'Neverway is officially coming to Nintendo Switch in October 2026. Track the exact date, eShop listing, price, performance, and feature status.',
    answer: 'Yes. Neverway is officially confirmed for Nintendo Switch in October 2026. Nintendo published a release-window trailer, but an exact launch day is not yet listed.',
    sections: [
      ['What Nintendo confirmed', '<p>Nintendo’s official release trailer names Nintendo Switch and October 2026. The game’s official site also states that Neverway is launching for PC and Switch in that window.</p>'],
      ['What is not confirmed yet', '<p>A final eShop price, file size, frame-rate target, resolution, pre-load timing, demo availability, and feature parity are not stated on the official sources reviewed for this update. Do not use PC requirements to predict Switch performance.</p>'],
      ['Switch buying checklist', '<p>Closer to launch, compare the final eShop listing with Steam for languages, achievements or platform equivalents, cloud-save support, controller options, and patch timing. If handheld performance is important, wait for footage from the release build rather than relying on a trailer alone.</p>']
    ], faq: [['Is there an exact Switch date?','Not yet. The official window is October 2026.'],['Is the Prologue on Switch?','A public Switch Prologue is not announced on the official pages reviewed for this update.']], sources: officialSources()
  },
  {
    path: 'platforms/ps5', label: 'PS5', eyebrow: 'Unconfirmed Platform',
    title: 'Is Neverway Coming to PS5 or PS4? PlayStation Status',
    description: 'Neverway is not currently announced for PS5 or PS4. The confirmed October 2026 platforms are PC and Nintendo Switch.',
    answer: 'No PlayStation version of Neverway has been announced. As of July 17, 2026, the official launch platforms are PC and Nintendo Switch.',
    sections: [
      ['Current PlayStation status', '<p>The official site names PC and Switch, the Steam page covers desktop systems, and Nintendo has a Switch trailer. None of those official sources lists PS5 or PS4. This is an unconfirmed status, not proof that a later PlayStation port will never happen.</p>'],
      ['How to verify a future port', '<p>Look for a PlayStation Store product page or an announcement from Coldblood Inc. An unsourced retailer date, search-result snippet, or platform wish list is not confirmation. This guide will switch from status coverage to release details only after a primary source appears.</p>'],
      ['What to play at launch', '<p>The announced October choices are PC and Nintendo Switch. PC players can test the free Steam Prologue now. Players who only own PlayStation should wait for an official announcement rather than buying based on port speculation.</p>']
    ], faq: [['Was PS5 included in the release trailer?','No. The official release-window trailer is for Nintendo Switch.'],['Could PS5 arrive later?','It is possible in general, but there is no official Neverway PlayStation announcement to support a date or promise.']], sources: officialSources()
  },
  {
    path: 'platforms/xbox', label: 'Xbox', eyebrow: 'Unconfirmed Platform',
    title: 'Is Neverway Coming to Xbox Series X|S or Game Pass?',
    description: 'Neverway is not currently announced for Xbox Series X|S, Xbox One, or Game Pass. PC and Nintendo Switch are the confirmed platforms.',
    answer: 'No Xbox or Game Pass release has been announced for Neverway. The currently confirmed October 2026 platforms are PC and Nintendo Switch.',
    sections: [
      ['Current Xbox status', '<p>The official Neverway site lists PC and Switch only. There is no Xbox Store page or official Xbox announcement in the sources reviewed on July 17, 2026. Do not confuse Xbox-controller discussion with an Xbox console version.</p>'],
      ['Controller support is different', '<p>The PC game is designed for keyboard or controller, and community users discuss Xbox-style button layouts. That only describes input on PC; it does not confirm a Series X|S or Xbox One release.</p>'],
      ['Game Pass status', '<p>No Game Pass inclusion is announced. A future subscription deal or port would need confirmation from the developer, publisher, Xbox, or an official store listing. Until then, PC and Nintendo Switch are the only supported launch choices.</p>']
    ], faq: [['Does Xbox controller support mean an Xbox version exists?','No. Controller compatibility on PC does not confirm a console port.'],['Is Neverway on Game Pass?','No Game Pass release has been announced.']], sources: officialSources()
  },
  {
    path: 'platforms/steam-deck', label: 'Steam Deck', eyebrow: 'Compatibility Status',
    title: 'Neverway Steam Deck Compatibility and Linux Support',
    description: 'Steam lists SteamOS + Linux support for Neverway, but no official Steam Deck Verified rating is currently shown. Test the free Prologue before launch.',
    answer: 'Neverway lists SteamOS + Linux support, but an official Steam Deck Verified or Playable badge is not currently stated on the Steam listing reviewed for this guide.',
    sections: [
      ['What is confirmed', '<p>The Steam page includes a SteamOS + Linux system-requirements tab, and the game supports controller input. Those are encouraging signals for handheld PC play, but they are not a substitute for Valve’s Deck compatibility review.</p>'],
      ['What remains unknown', '<p>There is no confirmed Deck performance target, battery estimate, text-legibility result, default control profile, or Verified badge in the official information used here. Performance can also change between the Prologue and final release.</p>'],
      ['How to test responsibly', '<p>Use the free Prologue to check startup, prompts, text size, sleep/resume, and frame pacing on your own device. If it fails to launch, the official FAQ provides Vulkan and D3D11 options for PC, though Deck-specific fixes should be verified before applying desktop guidance.</p>']
    ], faq: [['Is Neverway Steam Deck Verified?','No official Verified status is stated in the Steam listing reviewed for this update.'],['Does Neverway support Linux?','Steam currently provides a SteamOS + Linux requirements section.']], sources: officialSources()
  },
  {
    path: 'features/multiplayer', label: 'Multiplayer', eyebrow: 'Feature Status',
    title: 'Is Neverway Multiplayer, Co-op, or Single-player?',
    description: 'Neverway is listed as a single-player game. Steam does not list online multiplayer, local co-op, or online co-op for the October 2026 release.',
    answer: 'Neverway is currently a single-player game. Steam lists Single-player and does not list local co-op, online co-op, or multiplayer.',
    sections: [
      ['Confirmed mode', '<p>The official store feature list includes Single-player. The story follows Fiona, a specific protagonist, as she begins a new life and becomes the immortal herald of a dead god.</p>'],
      ['What is not listed', '<p>No cooperative farm, shared world, PvP, online multiplayer, or local split-screen feature is shown on the Steam page. Social systems in the story—friendships, dating, and character routines—are interactions with game characters, not other players.</p>'],
      ['Could multiplayer be added?', '<p>The developers could announce new features in the future, but there is no primary-source basis for promising multiplayer. Buy or wishlist the game for its stated single-player experience unless an official update changes the feature list.</p>']
    ], faq: [['Can I farm with friends?','No co-op farming mode is currently listed.'],['Is Neverway an MMO?','No. It is presented as a single-player horror life sim and action RPG.']], sources: officialSources()
  },
  {
    path: 'features/story-length', label: 'Story Length', eyebrow: 'Story Structure',
    title: 'Does Neverway Have an Ending or Endless Farming?',
    description: 'Neverway is primarily a story game with a beginning and an end, estimated at about 20 hours, with optional farming, relationships, and detours.',
    answer: 'Neverway has a defined story ending. The developers describe it as primarily a story game with a beginning and an end, not an endless farm simulator.',
    sections: [
      ['Story-first structure', '<p>The team’s official Steam update sets expectations clearly: the main story is currently estimated at around 20 hours and has an ending. Farming and life-sim systems support the journey, but the game is not being positioned as a forever sandbox.</p>'],
      ['What can extend a playthrough', '<p>Optional detours, relationships with 10+ characters, crafting, farming, fishing, decorating, combat builds, and exploration can add time. Steam tags also include multiple endings, but exact routes and requirements should not be invented before the final game can be verified.</p>'],
      ['Post-ending play status', '<p>The developers’ statement confirms an ending but does not confirm whether a completed save can continue indefinitely afterward. Treat post-game farming, New Game Plus, and chapter replay as unconfirmed until official details or the launch build provides evidence.</p>']
    ], faq: [['Can I keep farming after the ending?','Post-ending free play is not currently confirmed.'],['How long is the story?','The developers currently estimate about 20 hours for the main story.']], sources: officialSources()
  }
];

function cards(items) { return `<div class="related-grid">${items.map(([href,text])=>`<a href="${href}">${text}</a>`).join('')}</div>`; }
function officialSources() { return [
  ['Official Neverway site','https://neverwaygame.com/'],
  ['Neverway on Steam','https://store.steampowered.com/app/2318330/Neverway/'],
  ['Nintendo release-window trailer','https://www.youtube.com/watch?v=GVi9Fl49MLs']
]; }
function esc(s) { return s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
function pageHtml(p) {
  const url = `${site}/${p.path}/`;
  const crumbs = p.path.split('/');
  const faqSchema = p.faq?.length ? `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:p.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))})}</script>` : '';
  const breadcrumbSchema = JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${site}/`},...crumbs.map((c,i)=>({'@type':'ListItem',position:i+2,name:i===crumbs.length-1?p.label:titleCase(c),item:`${site}/${crumbs.slice(0,i+1).join('/')}/`}))]});
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"/><link rel="canonical" href="${url}"/>
<meta name="robots" content="index, follow, max-image-preview:large"/><meta name="theme-color" content="#101311"/>
<meta property="og:type" content="article"/><meta property="og:site_name" content="Neverway Guide"/><meta property="og:title" content="${esc(p.title)}"/><meta property="og:description" content="${esc(p.description)}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="${site}/assets/neverway-hero.png"/>
<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(p.title)}"/><meta name="twitter:description" content="${esc(p.description)}"/><meta name="twitter:image" content="${site}/assets/neverway-hero.png"/>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/><link rel="manifest" href="/site.webmanifest"/><link rel="stylesheet" href="/styles.css"/>
<script type="application/ld+json">${breadcrumbSchema}</script>${faqSchema}</head>
<body><header class="site-header"><a class="brand" href="/"><span class="brand-mark">N</span><span>Neverway Guide</span></a><nav class="nav" aria-label="Main navigation"><a href="/guides/">Guides</a><a href="/demo/">Prologue</a><a href="/platforms/">Platforms</a><a href="/characters/">Characters</a><a href="/faq/">FAQ</a></nav></header>
<main><section class="page-hero"><div class="breadcrumb"><a href="/">Home</a><span>/</span>${crumbs.length>1?`<a href="/${crumbs[0]}/">${titleCase(crumbs[0])}</a><span>/</span>`:''}<span>${p.label}</span></div><p class="eyebrow">${p.eyebrow}</p><h1>${p.title}</h1><p>${p.description}</p></section>
<div class="content-page"><article class="article-body"><section class="quick-answer" id="answer"><h2>Quick answer</h2><p>${p.answer}</p><p class="seo-note">Verified ${updated}. This guide separates confirmed facts from unannounced features.</p></section>
${p.sections.map(([h,b],i)=>`<section id="section-${i+1}"><h2>${h}</h2>${b}</section>`).join('')}
${p.faq?.length?`<section id="faq"><h2>Frequently asked questions</h2>${p.faq.map(([q,a])=>`<h3>${q}</h3><p>${a}</p>`).join('')}</section>`:''}
<section id="sources"><h2>Verification sources</h2><ul>${p.sources.map(([t,u])=>`<li><a href="${u}" rel="noreferrer">${t}</a></li>`).join('')}</ul><p>Neverway Guide is an unofficial fan site. Store and developer pages take priority when details change.</p></section>
<section><h2>Continue browsing</h2>${cards([['/demo/','Prologue help'],['/platforms/','Platform status'],['/release-date/','Release date'],['/guides/','All guides']])}</section></article>
<aside class="sidebar"><h2>On this page</h2><a href="#answer">Quick answer</a>${p.sections.map(([h],i)=>`<a href="#section-${i+1}">${h}</a>`).join('')}${p.faq?.length?'<a href="#faq">FAQ</a>':''}<a href="#sources">Sources</a></aside></div></main>
<footer><p>Neverway Guide — unofficial, evidence-led player guide. Updated ${updated}.</p></footer></body></html>`;
}
function titleCase(s){ return s.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join(' '); }

for (const p of pages) {
  const out = resolve(root, p.path, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, pageHtml(p));
}

const sitemapPaths = new Set(['/']);
for (const p of pages) sitemapPaths.add(`/${p.path}/`);

// Preserve useful legacy pages for navigation, but keep unreviewed MVP leaves out
// of Google's index until they are rewritten and explicitly added to `pages`.
async function walkHtml(dir){
  for (const name of await readdir(dir)) {
    const p=resolve(dir,name); const s=await stat(p);
    if (s.isDirectory() && name !== 'scripts') await walkHtml(p);
    else if (name === 'index.html' && p !== resolve(root,'index.html')) {
      const route='/' + p.slice(root.length+1,-'index.html'.length).replaceAll('\\','/');
      if (!sitemapPaths.has(route)) {
        const html=await readFile(p,'utf8');
        await writeFile(p, html.replace(/<meta name="robots" content="index, follow, max-image-preview:large"\s*\/>/, '<meta name="robots" content="noindex, follow" />'));
      }
    }
  }
}
await walkHtml(root);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...sitemapPaths].sort().map(path=>`  <url><loc>${site}${path}</loc><lastmod>2026-07-17</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root,'sitemap.xml'), sitemap);

console.log(`Generated ${pages.length} evidence-led pages and ${sitemapPaths.size} sitemap URLs.`);
